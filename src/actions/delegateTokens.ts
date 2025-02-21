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
import { getDelegateTokensExamples } from "../examples";
import { createNetworkService } from "../services";
import { delegateTokensTemplate } from "../templates";
import { DelegateTokensSchema } from "../types";
import { getTxReceipt } from "../utils";

export interface DelegateTokensContent extends Content {
    network: string;
    delegated: string;
    bips: number;
}

function isDelegateTokensContent(
    content: any
): content is DelegateTokensContent {
    // elizaLogger.debug("Content for delegation", content);
    console.log("Content for delegation", content);
    return (
        typeof content.network === "string" &&
        typeof content.delegated === "string" &&
        typeof content.bips === "number" // bp is 0.01 of a percentage
    );
}

export const delegateTokensAction: Action = {
    name: "DELEGATE_TOKENS",
    similes: [
        "TOKENS_DELEGATION",
        "DELEGATION",
        "DELEGATE",],
    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        await validateFlareConfig(runtime);
        return true;
    },
    description:
        `MUST use this action if the user requests to delegate tokens, 
        the request might be varied, but it will always be a token delegation
        on a selected chain. 
        DO NOT use it, if it only asks for current balance.`,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ) => {
        elizaLogger.log("Starting DELEGATE_TOKENS handler...");

        // Initialize or update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        // Compose delegation context
        const delegateTokensContext = composeContext({
            state,
            template: delegateTokensTemplate,
        });

        // Generate delegation content
        const content = await generateObject({
            runtime,
            context: delegateTokensContext,
            modelClass: ModelClass.SMALL,
            schema: DelegateTokensSchema,
        });

        const callArguments = content.object;

        // Validate delegation content
        if (!isDelegateTokensContent(callArguments)) {
            elizaLogger.error("Invalid content for DELEGATE_TOKENS action.");
            callback?.({
                text: "Unable to process delegation request. Invalid content provided.",
                content: { error: "Invalid delegation content" },
            });
            return false;
        }

        const networkService = createNetworkService(
            callArguments.network as string
        );


        try {
            const tx = await networkService.delegateTokens(
                runtime,
                callArguments.delegated as Address,
                callArguments.bips as number
            );
            const receipt = await getTxReceipt(runtime, callArguments.network as string, tx);
            if (receipt.status === "success") {
                callback?.({
                    text: `delegation successful, with transaction ${receipt.transactionHash}`,
                    content: { success: true, txHash: tx },
                });
            } else {
                callback?.({
                    text: "Delegation failed",
                    content: { error: "Delegation failed" },
                });
            }
        } catch (error: any) {
            callback?.({
                text: `Delegation failed with: ${error}`,
                content: { error: "Delegation failed" },
            });
        }

        return true;
    },
    examples: getDelegateTokensExamples as ActionExample[][],
} as Action;

