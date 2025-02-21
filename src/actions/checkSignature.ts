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
import { Address } from "viem";
import { validateFlareConfig } from "../environment";
import { getCheckSignatureExamples } from "../examples";
import { createNetworkService } from "../services";
import { checkSignatureTemplate } from "../templates";
import { CheckSignatureSchema } from "../types";

export interface CheckSignatureContent extends Content {
    network: string;
    message: string;
    signature: string;
    signerAddress: string;
}

function isCheckSignatureContent(
    content: any
): content is CheckSignatureContent {
    // elizaLogger.debug("Content for checking the signature", content);
    console.log("Content for checking the signature", content);
    return (
        typeof content.network === "string" &&
        typeof content.message === "string" &&
        typeof content.signature === "string" &&
        typeof content.signerAddress === "string"
    );
}

export const checkSignatureAction: Action = {
    name: "CHECK_SIGNATURE",
    similes: [
        "SIGNATURE_VERIFICATION",
        "VERIFY_SIGNATURE",
        "SIGNING_CHECK",
    ],
    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        await validateFlareConfig(runtime);
        return true;
    },
    description:
        `MUST use this action if the user requests to check the given signature.
        Can ONLY BE USED IF the user has to provided the signature of length 132
        characters and the original message. The request might be varied, but it 
        will always request a signature verification. DO NOT use it, if it only 
        asks for current balance.`,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ) => {
        elizaLogger.log("Starting CHECK_SIGNATURE handler...");


        // Initialize or update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        // Compose verification context
        const checkSignatureContext = composeContext({
            state,
            template: checkSignatureTemplate,
        });

        // Generate verification content
        const content = await generateObject({
            runtime,
            context: checkSignatureContext,
            modelClass: ModelClass.SMALL,
            schema: CheckSignatureSchema
        });

        const callArguments = content.object;

        // Validate verification content
        if (!isCheckSignatureContent(callArguments)) {
            elizaLogger.error("Invalid content for CHECK_SIGNATURE action.");
            callback?.({
                text: "Unable to process signature verification request. Invalid content provided.",
                content: { error: "Invalid signature check content" },
            });
            return false;
        }

        const networkService = createNetworkService(
            callArguments.network as string
        );

        try {
            // Check the signature on the contract
            const isValid = await networkService.checkMessageSignature(
                runtime,
                callArguments.message as string,
                callArguments.signature as string,
                callArguments.signerAddress as Address,
            );
            let requestAnswer: string;
            if (isValid) {
                requestAnswer = `The message [${callArguments.message as string}] is authentic and signed with the given signature.`;
            } else {
                requestAnswer = `The signature does not match the given message [${callArguments.message as string}] and signer address.`
            }
            callback?.({
                text: requestAnswer,
                content: { success: true, isSignatureValid: isValid },
            });
        } catch (error: any) {
            callback?.({
                text: `signature verification failed with: ${error}`,
                content: { error: "Signature verification failed" },
            });
        }

        return true;
    },
    examples: getCheckSignatureExamples as ActionExample[][],
} as Action;
