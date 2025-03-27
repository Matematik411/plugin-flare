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
import { getSignIntermediaryExamples } from "../examples";
import { createNetworkService } from "../services";
import { signIntermediaryTemplate } from "../templates";
import { IntermediaryForm, SignIntermediarySchema } from "../types";

export interface SignIntermediaryContent extends Content {
    amount: number;
    recipient: string;
    duration: number;
    nonce: number;
    fee: string;
}

function isSignIntermediaryContent(
    content: any
): content is SignIntermediaryContent {
    console.log("Content for getting an intermediary signature", content);
    return (
        typeof content.amount === "number" &&
        typeof content.recipient === "string" &&
        typeof content.duration === "number" &&
        typeof content.nonce === "number" &&
        typeof content.fee === "string"
    );
}

// Generates signatures and returns them
export const signIntermediaryAction: Action = {
    name: "SIGN_INTERMEDIARY",
    similes: [
        "TOKEN_TRANSFER_THROUGH_INTERMEDIARY",
        "GET_INTERMEDIARY_SIGNATURE",
    ],
    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        await validateFlareConfig(runtime);
        return true;
    },
    description:
        `MUST use this action if the user requests a signature for an intermediary
        about an authorized token transfer.
        The request might be varied, but it will always ask for signatures of an 
        authorized token transfer.
        Can ONLY BE USED if the user has provided the recipient and the amount of
        tokens to be sent, the fee they will pay to the executioner, the nonce value
        of the transfer and the duration the signatures need to last.
        If any of the arguments are missing or set to "null", ask for the user to provide them.
        The amount and fee values must be larger than zero.
        The duration is changed into seconds from any other time unit like 
        minutes, hours, days or longer.
        The fee value must be in decimal format and is in string form.
        DO NOT use this for anything else than generating signatures, especially
        if the user asks to simply transfer tokens.`,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ) => {
        elizaLogger.log("Starting SIGN_INTERMEDIARY handler...");

        // Initialize or update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        // Compose context for intermediary signature
        const signIntermediaryContext = composeContext({
            state,
            template: signIntermediaryTemplate,
        });

        let content;
        try {
            // Generate content for intermediary signature
            content = await generateObject({
                runtime,
                context: signIntermediaryContext,
                modelClass: ModelClass.MEDIUM,
                schema: SignIntermediarySchema
            });
        } catch (error: any) {
            callback?.({
                text: `There are missing arguments in your request.`,
                content: { error: "Generate object failed" },
            });
            return false;
        }
        const callArguments = content.object as SignIntermediaryContent;

        // Validate signing data content
        if (!isSignIntermediaryContent(callArguments)) {
            elizaLogger.error("Invalid content for SIGN_INTERMEDIARY action.");
            callback?.({
                text: "Unable to process getting the signature of a transfer request. Invalid content provided.",
                content: { error: "Invalid request for intermediary signature content" },
            });
            return false;
        }

        const networkService = createNetworkService(
            "coston"
        )

        try {
            const sigData = await networkService.signIntermediary(
                runtime,
                callArguments.amount as number,
                callArguments.recipient as Address,
                callArguments.duration as number,
                callArguments.nonce as number,
                callArguments.fee as string,
            );
            callback?.({
                text: `Signing successful, the signatures are: transfer signature [${sigData.signature}]
                and intemediary signature [${sigData.intermediarySignature}].

                The full parameters with the signatures are:
                ${JSON.stringify(sigData as IntermediaryForm,
                    (_, value) => typeof value === "bigint" ? value.toString() : value,
                    2)}`,
                content: { success: true, transferSig: sigData[6], feeSig: sigData[8] },
            });
        } catch (error: any) {
            callback?.({
                text: `Signing failed with error ${error}`,
                content: { error: "Signing failed" },
            });
        }

        return true;
    },
    examples: getSignIntermediaryExamples as ActionExample[][],
} as Action;
