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
import { getWrapTokensExamples } from "../examples";
import { createNetworkService } from "../services";
import { wrapTokensTemplate } from "../templates";
import { WrapTokensSchema } from "../types";
import { getTxReceipt } from "../utils";

export interface WrapTokensContent extends Content {
    network: string
    action: string
    amount: number;
}

function isWrapTokensContent(
    content: any
): content is WrapTokensContent {
    // elizaLogger.debug("Content for wrapping", content);
    console.log("Content for wrapping", content);
    return (
        typeof content.network === "string" &&
        typeof content.network === "string" &&
        typeof content.amount === "number"
    );
}

export const wrapTokensAction: Action = {
    // 550 C2FLR 
    // 225 CFLR
    // 0.000003	SGB
    name: "WRAP_TOKENS",
    similes: [
        "EXCHANGE_FOR_WRAPPED_TOKENS",
        "WRAPPED_TOKENS",
        "WITHDRAW_TOKENS",
        "EXCHANGE_TOKENS",
        "WRAP",
        "UNWRAP_TOKENS"
    ],
    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        await validateFlareConfig(runtime);
        return true;
    },
    description:
        `MUST use this action if the user requests to wrap or withdraw wrapped tokens, the request might be varied, 
        but it will always be about token wrapping. When requested, wrap tokens without asking for further
        confirmation from the user. DO NOT use it, if it only asks for current balance.`,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ) => {
        elizaLogger.log("Starting WRAP_TOKENS handler...");


        // Initialize or update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        // Compose wrap context
        const wrapFlareContext = composeContext({
            state,
            template: wrapTokensTemplate,
        });

        // Generate wrap content
        const content = await generateObject({
            runtime,
            context: wrapFlareContext,
            modelClass: ModelClass.SMALL,
            schema: WrapTokensSchema,
        });
        const callArguments = content.object as WrapTokensContent;

        // Validate wrap content
        if (!isWrapTokensContent(callArguments)) {
            elizaLogger.error("Invalid content for WRAP_TOKENS action.");
            callback?.({
                text: "Unable to process wrapping request. Invalid content provided.",
                content: { error: "Invalid wrapping content" },
            });
            return false;
        }

        const networkService = createNetworkService(
            callArguments.network as string
        );


        try {
            const tx = await networkService.wrapTokens(
                runtime,
                callArguments.action as string,
                callArguments.amount as number
            );
            const receipt = await getTxReceipt(runtime, callArguments.network as string, tx);
            if (receipt.status === "success") {
                callback?.({
                    text: `wrapping of ${callArguments.amount} on ${callArguments.network} successful, with transaction ${receipt.transactionHash}`,
                    content: { success: true, txHash: tx },
                });
            } else {
                callback?.({
                    text: "Wrapping failed",
                    content: { error: "Wrapping failed" },
                });
            }
        } catch (error: any) {
            callback?.({
                text: `Wrapping failed with: ${error}`,
                content: { error: "Wrapping failed" },
            });
        }

        return true;
    },
    examples: getWrapTokensExamples as ActionExample[][],
} as Action;

