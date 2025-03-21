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
    State,
} from "@elizaos/core";
import { validateFlareConfig } from "../environment";
import { getSignMessageExamples } from "../examples";
import { createNetworkService } from "../services";
import { signMessageTemplate } from "../templates";
import { SignMessageSchema } from "../types";

export interface SignMessageContent extends Content {
    network: string,
    message: string,
}

function isSignMessageContent(
    content: any
): content is SignMessageContent {
    console.log("Content for sign message", content);
    return (
        typeof content.network === "string" &&
        typeof content.message === "string"
    );
}

export const signMessageAction: Action = {
    name: "SIGN_MESSAGE",
    similes: [
        "MESSAGE_SIGNING",
        "ETHEREUM_SIGNATURE_OF_MESSAGE",
        "MESSAGE",
    ],
    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        await validateFlareConfig(runtime);
        return true;
    },
    description:
        `MUST use this action if the user requests to sign a text message. 
        The request might be varied, but it will always request a signature
        for a text message.
        Can ONLY BE USED if the user has provided a text message to be signed 
        and the network.
        If any of the arguments are missing, ask for the user to provide them.
        Before executing the command, write out the understood parameters for the 
        user to check them, then ALWAYS ask for permission to execute the command.
        Only after receiving the user's approval of the parameters, execute it.
        If a signature of length 132 characters is already given, DO NOT use 
        this action. 
        DO NOT use this for anything else than generating a signature of a 
        text message.`,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ) => {
        elizaLogger.log("Starting SIGN_MESSAGE handler...");


        // Initialize or update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        // Compose signing context
        const signMessageContext = composeContext({
            state,
            template: signMessageTemplate,
        });

        // Generate signing content
        const content = await generateObject({
            runtime,
            context: signMessageContext,
            modelClass: ModelClass.SMALL,
            schema: SignMessageSchema
        });

        const callArguments = content.object;

        // Validate signing content
        if (!isSignMessageContent(callArguments)) {
            elizaLogger.error("Invalid content for SIGN_MESSAGE action.");
            callback?.({
                text: "Unable to process signing request. Invalid content provided.",
                content: { error: "Invalid signing content" },
            });
            return false;
        }

        const networkService = createNetworkService(
            callArguments.network as string
        )

        try {
            const signature = await networkService.signMessage(
                runtime,
                callArguments.message as string
            );
            callback?.({
                text: `signing successful, the signature of [${callArguments.message as string}] is: 
                ${signature}`,
                content: { success: true, signature: signature },
            });
        } catch (error: any) {
            callback?.({
                text: `signing failed with error ${error}`,
                content: { error: "Signing failed" },
            });
        }

        return true;
    },
    examples: getSignMessageExamples as ActionExample[][],
} as Action;
