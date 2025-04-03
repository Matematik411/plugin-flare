import {
    Action,
    ActionExample,
    composeContext,
    Content,
    elizaLogger,
    generateObject,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State
} from "@elizaos/core";
import { Address } from "viem";
import { validateFlareConfig } from "../environment";
import { getSignAuthorizationExamples } from "../examples";
import { createNetworkService } from "../services";
import { signAuthorizationTemplate } from "../templates";
import { ProcessReturn, SignAuthorizationSchema } from "../types";

export interface SignAuthorizationContent extends Content {
    amount: number;
    recipient: string;
    nonce: number;
}

function isSignAuthorizationContent(
    content: any
): content is SignAuthorizationContent {
    console.log("Content for authorizing a token transfer", content);
    return (
        typeof content.amount === "number" &&
        typeof content.recipient === "string" &&
        typeof content.nonce === "number"
    );
}

// Authorizes a token transfer with a signature and sends it to the executor
// that executes the token transfer.
// Currently a coston2 executor is set up, and this action is for a specific
// USDT token (set it the contracts.json).
export const signAuthorizationAction: Action = {
    name: "SIGN_AUTHORIZATION",
    similes: [
        "AUTHORIZE_A_TOKEN_TRANSFER",
        "AUTHORIZED_TOKEN_TRANSFER"
    ],
    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        await validateFlareConfig(runtime);
        return true;
    },
    description:
        `MUST use this action if the user requests to make an authorized token 
        transfer.
        The request might be varied, but it will always ask for an authorized token
        tranfer or its signature.
        Can ONLY BE USED if the user has provided the recipient and the amount of
        tokens to be sent, the nonce value of the transfer.
        If any of the arguments are missing or set to "null", ask for the user to provide them.
        Before executing the command, write out the understood parameters for the 
        user to check them, then ALWAYS ask for permission to execute the command.
        Only after receiving the user's approval of the parameters, execute it.
        If the user disagrees with the parameters, do not execute the action and
        dismiss the request for it.
        The amount value must be larger than zero.
        This action does not require a network argument, as the tokens used are
        predetermined.
        DO NOT use this for anything else than executing an authorized token
        transfer, especially if the user asks to simply transfer tokens or get
        signatures for an intermediary transfer.`,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ) => {
        elizaLogger.log("Starting SIGN_AUTHORIZATION handler...");

        // Initialize or update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        // Compose context for an authorized transfer
        const signAuthorizationContext = composeContext({
            state,
            template: signAuthorizationTemplate,
        });

        let content;
        try {
            // Generate content for an authorized transfer
            content = await generateObject({
                runtime,
                context: signAuthorizationContext,
                modelClass: ModelClass.SMALL,
                schema: SignAuthorizationSchema
            });
        } catch (error: any) {
            callback?.({
                text: `There are missing arguments in your request.`,
                content: { error: "Generate object failed" },
            });
            return false;
        }
        const callArguments = content.object as SignAuthorizationContent;

        // Validate signing data content
        if (!isSignAuthorizationContent(callArguments)) {
            elizaLogger.error("Invalid content for SIGN_AUTHORIZATION action.");
            callback?.({
                text: "Unable to process content for an authorized transfer request.",
                content: { error: "Invalid request for an authorized transfer content" },
            });
            return false;
        }

        const networkService = createNetworkService(
            "coston2"
        )

        try {
            const response: ProcessReturn = await networkService.signAuthorizedTransfer(
                runtime,
                callArguments.amount as number,
                callArguments.recipient as Address,
                callArguments.nonce as number,
            );
            if (response.success === true) {
                callback?.({
                    text: `Authorized transfer of ${callArguments.amount} tokens to ${callArguments.recipient} with nonce ${callArguments.nonce} was successful.
The transaction hash is ${response.txHash}`,
                    content: { success: true, txHash: response.txHash }
                })
            } else {
                callback?.({
                    text: `Authorized transfer wasn't processed, it is most likely inaccurate.
You can check it's status on ${response.url}`,
                    content: { error: "Authorization failed" }
                })
            }
        } catch (error: any) {
            callback?.({
                text: `Authorization failed with error ${error}`,
                content: { error: "Authorizing the transfer failed" },
            });
        }

        return true;
    },
    examples: getSignAuthorizationExamples as ActionExample[][],
} as Action;
