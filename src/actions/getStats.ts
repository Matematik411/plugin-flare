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
import { getNetworkStatsExamples } from "../examples";
import { createNetworkService } from "../services";
import { getStatsTemplate } from "../templates";
import { GetStatsSchema } from "../types";

export interface GetStatsContent extends Content {
    network: string;
}

function isGetStatsContent(
    content: any
): content is GetStatsContent {
    console.log("Content for getting stats", content);
    return (
        typeof content.network === "string"
    );
}


export const getStatsAction: Action = {
    name: "GET_NETWORK_STATS",
    similes: [
        "NETWORK_STATS",
        "STATS",
    ],
    description:
        `MUST use this action when user asks for the stats of the selected network.
        The request might be varied, but it will always ask about the stats of 
        Can ONLY BE USED if the user provides the network. 
        a network. If any of the arguments are missing, ask for the user to provide them.
        Before executing the command, write out the understood parameters for the 
        user to check them, then ALWAYS ask for permission to execute the command.
        Only after receiving the user's approval of the parameters, execute it.
        DO NOT use this for anything else than getting the stats of a network.`,
    validate: async (runtime: IAgentRuntime) => {
        await validateFlareConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        elizaLogger.log("Starting GET_NETWORK_STATS handler...");

        // Initialize or update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }
        // Compose reading of the context
        const getStatsContext = composeContext({
            state,
            template: getStatsTemplate,
        });

        // Generate reading of stats content
        const content = await generateObject({
            runtime,
            context: getStatsContext,
            modelClass: ModelClass.SMALL,
            schema: GetStatsSchema,
        });
        const callArguments = content.object;

        // Validate reading of a feed content
        if (!isGetStatsContent(callArguments)) {
            elizaLogger.error("Invalid content for GET_NETWORK_STATS action.");
            callback?.({
                text: "Unable to process the stats request. Invalid content provided.",
                content: { error: "Invalid stats content" },
            });
            return false;
        }



        const networkService = createNetworkService(
            callArguments.network as string
        );

        try {
            const statsData = await networkService.getStats();
            elizaLogger.success(
                `Successfully fetched Stats`,
                statsData,
                'end of data'
            );
            if (callback) {
                callback({
                    text: `Here are the stats for the ${callArguments.network} network: 
- Total transactions ${statsData.total_transactions}
- Total blocks ${statsData.total_blocks}
- Total addresses ${statsData.total_addresses}
- Total gas used ${statsData.total_gas_used}
- Transactions today ${statsData.transactions_today} 
- Gas used today ${statsData.gas_used_today}
- Average block time ${statsData.average_block_time}
- Coin price ${statsData.coin_price}`
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error in Flare plugin handler:", error);
            callback({
                text: `Error fetching stats: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getNetworkStatsExamples as ActionExample[][],
} as Action;