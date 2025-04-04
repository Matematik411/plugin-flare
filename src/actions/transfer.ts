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
import { getTransferExamples } from "../examples";
import { createNetworkService } from "../services";
import { transferTemplate } from "../templates";
import { TransferSchema } from "../types";
import { getTxReceipt } from "../utils";

export interface TransferContent extends Content {
    network: string;
    recipient: string;
    amount: number;
}

function isTransferContent(
    content: any
): content is TransferContent {
    console.log("Content for transfer", content);
    return (
        typeof content.network === "string" &&
        typeof content.recipient === "string" &&
        typeof content.amount === "number"
    );
}

export const transferAction: Action = {
    name: "NATIVE_TRANSFER",
    similes: [
        "TRANSFER_NATIVE_TOKEN",
        "DIRECT_TRANSFER",
        "DIRECT_SEND",
        "TRANSFER"
    ],
    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        await validateFlareConfig(runtime);
        return true;
    },
    description:
        `MUST use this action if the user requests to (directly) send or transfer 
        tokens. 
        The request might be varied, but it will always be a token transfer.
        Can ONLY BE USED if the user provides the target address, the amount of 
        tokens to be transferred and the network to do it on.
        If any of the arguments are missing or set to "null", ask for the user to provide them.
        Before executing the command, write out the understood parameters for the 
        user to check them, then ALWAYS ask for permission to execute the command.
        Only after receiving the user's approval of the parameters, execute it.
        If the user disagrees with the parameters, do not execute the action and
        dismiss the request for it.
        The amount value must be larger than zero.
        DO NOT use this for anything else than directly transferring tokens, 
        especially if user asks for a signature of a token transfer or if they
        are talking about wrapped tokens.`,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ) => {
        elizaLogger.log("Starting NATIVE_TRANSFER handler...");

        // Initialize or update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        // Compose transfer context
        const transferContext = composeContext({
            state,
            template: transferTemplate,
        });

        let content;
        try {
            // Generate transfer content
            content = await generateObject({
                runtime,
                context: transferContext,
                modelClass: ModelClass.SMALL,
                schema: TransferSchema
            });
        } catch (error: any) {
            callback?.({
                text: `There are missing arguments in your request.`,
                content: { error: "Generate object failed" },
            });
            return false;
        }
        const callArguments = content.object;

        // Validate transfer content
        if (!isTransferContent(callArguments)) {
            elizaLogger.error("Invalid content for NATIVE_TRANSFER action.");
            callback?.({
                text: "Unable to process transfer request. Invalid content provided.",
                content: { error: "Invalid transfer content" },
            });
            return false;
        }

        const networkService = createNetworkService(
            callArguments.network as string
        );

        try {
            const tx = await networkService.transferTokens(
                runtime,
                callArguments.recipient as Address,
                callArguments.amount as number
            );
            const receipt = await getTxReceipt(runtime, callArguments.network as string, tx);
            if (receipt.status === "success") {
                callback?.({
                    text: `Transfer of ${callArguments.amount} ${callArguments.network}'s native tokens to ${callArguments.recipient} was successful.
The transaction hash is ${receipt.transactionHash}`,
                    content: { success: true, txHash: tx },
                });
            } else {
                callback?.({
                    text: "Native transfer service action failed, could not transfer.",
                    content: { error: "Transfer failed" },
                });
            }
        } catch (error: any) {
            callback?.({
                text: `Transfer failed with: ${error}`,
                content: { error: "Transfer failed" },
            });
        }

        return true;
    },
    examples: getTransferExamples as ActionExample[][],
} as Action;
