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
    message: string;
    signature: string;
    signerAddress: string;
}

function isCheckSignatureContent(
    content: any
): content is CheckSignatureContent {
    console.log("Content for checking the signature", content);
    return (
        typeof content.message === "string" &&
        typeof content.signature === "string" &&
        typeof content.signerAddress === "string"
    );
}

export const checkSignatureAction: Action = {
    name: "CHECK_SIGNATURE",
    similes: [
        "SIGNATURE_VERIFICATION",
        "MESSAGE_SIGNATURE_VERIFICATION",
        "VERIFY_SIGNATURE",
        "MESSAGE_SIGNING_CHECK",
    ],
    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        await validateFlareConfig(runtime);
        return true;
    },
    description:
        `MUST use this action if the user requests to check the given signature 
        of a message. 
        The request might be varied, but it will always request a signature verification. 
        Can ONLY BE USED if the user has to provided the signature 
        of length 132 characters, the original message and the address that signed
        it. 
        If any of the arguments are missing or set to "null", ask for the user to provide them.
        Before executing the command, write out the understood parameters for the 
        user to check them, then ALWAYS ask for permission to execute the command.
        Only after receiving the user's approval of the parameters, execute it.
        This action does not require a network argument, as the Ethereum signature
        of a text message is not dependent on it.
        DO NOT use this for anything else than checking message signatures.`,
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

        let content;
        try {
            // Generate verification content
            content = await generateObject({
                runtime,
                context: checkSignatureContext,
                modelClass: ModelClass.SMALL,
                schema: CheckSignatureSchema
            });
        } catch (error: any) {
            callback?.({
                text: `There are missing arguments in your request.`,
                content: { error: "Generate object failed" },
            });
            return false;
        }
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

        // Smart contract for this verification is deployed on Coston.
        // The network doesn't matter for the signature.
        const networkService = createNetworkService(
            "coston"
        );

        try {
            // Check the signature on the contract
            const isValid: boolean = await networkService.checkMessageSignature(
                runtime,
                callArguments.message as string,
                callArguments.signature as string,
                callArguments.signerAddress as Address,
            );
            let requestAnswer: string;
            if (isValid) {
                requestAnswer = `The message [${callArguments.message as string}] is authentic and signed with the given signature.`;
                callback?.({
                    text: requestAnswer,
                    content: { success: true, isSignatureValid: true },
                });
            } else {
                requestAnswer = `The signature does not match the given message [${callArguments.message as string}] and signer address [${callArguments.signerAddress as string}].`
                callback?.({
                    text: requestAnswer,
                    content: { error: "Signature is not valid and does not match the given signer address." },
                });
            }
        } catch (error: any) {
            callback?.({
                text: `Signature verification failed with: ${error}`,
                content: { error: "Signature verification failed" },
            });
        }

        return true;
    },
    examples: getCheckSignatureExamples as ActionExample[][],
} as Action;
