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
import { getSignTokenTransferExamples } from "../examples";
import { createNetworkService } from "../services";
import { signTokenTransferTemplate } from "../templates";
import { SignTokenTransferSchema } from "../types";

export interface SignTokenTransferContent extends Content {
    amount: number;
    recipient: string;
    duration: number;
}

function isSignTokenTransferContent(
    content: any
): content is SignTokenTransferContent {
    console.log("Content for sign token transfer", content);
    return (
        typeof content.amount === "number" &&
        typeof content.recipient === "string" &&
        typeof content.duration === "number"
    );
}

export const signTokenTransferAction: Action = {
    name: "SIGN_TOKEN_TRANSFER",
    similes: [
        "TRANSFER_SIGNING",
        "SIGN_TRANSFER",
    ],
    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        await validateFlareConfig(runtime);
        return true;
    },
    description:
        `MUST use this action if the user requests to SIGN a token transfer. 
        The user will provide the fields of the signed data.
        The duration is changed into seconds from any other time unit like hours or seconds.
        DO NOT use it, if it only asks for current balance or if it wants to 
        transfer tokens. `,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ) => {
        elizaLogger.log("Starting SIGN_TOKEN_TRANSFER handler...");


        // Initialize or update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        // Compose signing transfer context
        const signTokenTransferContext = composeContext({
            state,
            template: signTokenTransferTemplate,
        });

        // Generate signing transfer content
        const content = await generateObject({
            runtime,
            context: signTokenTransferContext,
            modelClass: ModelClass.SMALL,
            schema: SignTokenTransferSchema
        });

        const callArguments = content.object;

        // Validate signing data content
        if (!isSignTokenTransferContent(callArguments)) {
            elizaLogger.error("Invalid content for SIGN_TOKEN_TRANSFER action.");
            callback?.({
                text: "Unable to process signing of a transfer request. Invalid content provided.",
                content: { error: "Invalid signing of a token transfer content" },
            });
            return false;
        }

        const networkService = createNetworkService(
            "coston2"
        )

        try {
            const signature = await networkService.signTokenTransfer(
                runtime,
                callArguments.amount as number,
                callArguments.recipient as Address,
                callArguments.duration as number
            );
            callback?.({
                text: `signing successful, amount is [${callArguments.amount as number}] is: 
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
    examples: getSignTokenTransferExamples as ActionExample[][],
} as Action;
