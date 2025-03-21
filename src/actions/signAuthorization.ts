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
import { SignAuthorizationSchema } from "../types";

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
// that executes them
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
        If any of the arguments are missing, ask for the user to provide them.
        Before executing the command, write out the understood parameters for the 
        user to check them, then ALWAYS ask for permission to execute the command.
        Only after receiving the user's approval of the parameters, execute it.
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

        // Generate content for an authorized transfer
        const content = await generateObject({
            runtime,
            context: signAuthorizationContext,
            modelClass: ModelClass.SMALL,
            schema: SignAuthorizationSchema
        });

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
            const txHash = await networkService.signAuthorizedTransfer(
                runtime,
                callArguments.amount as number,
                callArguments.recipient as Address,
                callArguments.nonce as number,
            );
            if (txHash) {
                callback?.({
                    text: `Authorized transfer successfull with transaction hash ${txHash}.`,
                    content: { success: true, txHash: txHash }
                })
            } else {
                callback?.({
                    text: `Authorization failed.`,
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
