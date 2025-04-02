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
    console.log("Content for wrapping", content);
    return (
        typeof content.network === "string" &&
        typeof content.network === "string" &&
        typeof content.amount === "number"
    );
}

export const wrapTokensAction: Action = {
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
        `MUST use this action if the user requests to wrap or withdraw (unwrap) 
        wrapped tokens.
        The request might be varied, but it will always be a request about 
        exchanging wrapped and standard native tokens. 
        Can ONLY BE USED if the user has provided the action they want to do (that
        is wrapping or unwrapping), the amount of tokens they want to exchange
        and the network to do it on.
        If any of the arguments are missing or set to "null", ask for the user to provide them.
        Before executing the command, write out the understood parameters for the 
        user to check them, then ALWAYS ask for permission to execute the command.
        Only after receiving the user's approval of the parameters, execute it.
        If the user disagrees with the parameters, do not execute the action and
        dismiss the request for it.
        The amount value must be larger than zero.
        DO NOT use this for anything else than exchanging wrapped and standard
        tokens, especially if the user wants to transfer or delegate tokens.`,
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


        let content;
        try {
            // Generate wrap content
            content = await generateObject({
                runtime,
                context: wrapFlareContext,
                modelClass: ModelClass.SMALL,
                schema: WrapTokensSchema,
            });
        } catch (error: any) {
            callback?.({
                text: `There are missing arguments in your request.`,
                content: { error: "Generate object failed" },
            });
            return false;
        }
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
                    text: `${callArguments.action} of ${callArguments.amount} tokens on ${callArguments.network} successful, 
                    with transaction ${receipt.transactionHash}`,
                    content: { success: true, txHash: tx },
                });
            } else {
                callback?.({
                    text: "Wrapping service action failed, could not wrap.",
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

