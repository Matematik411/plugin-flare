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
import { formatUnits } from "viem";
import { validateFlareConfig } from "../environment";
import { getReadFeedExamples } from "../examples";
import { createNetworkService } from "../services";
import { readFeedTemplate } from "../templates";
import { ReadFeedSchema } from "../types";

export interface ReadFeedContent extends Content {
    network: string;
    feed: string;
}

function isReadFeedContent(
    content: any
): content is ReadFeedContent {
    console.log("Content for reading a feed", content);
    return (
        typeof content.network === "string" &&
        typeof content.feed === "string"
    );
}

export const readFeedAction: Action = {
    name: "READ_FEED",
    similes: [
        "READ_FEEDS",
        "FTSO_FEED",
    ],
    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        await validateFlareConfig(runtime);
        return true;
    },
    description:
        `MUST use this action if the user requests to read a feed on the FTSO.
        The request might be varied, but it will always be a query about FTSO feeds.
        The action reads the feed off the given network's FtsoV2 contract.
        Can ONLY BE USED if the user provides the name of the feed and the name
        of the network, on which we read the FTSO.
        If any of the arguments are missing or set to "null", ask for the user to provide them.
        DO NOT use this for anything else than reading an FTSO feed.`,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ) => {
        elizaLogger.log("Starting READ_FEED handler...");


        // Initialize or update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        // Compose reading of a feed context
        const readFeedContext = composeContext({
            state,
            template: readFeedTemplate,
        });

        let content;
        try {
            // Generate reading of a feed content
            content = await generateObject({
                runtime,
                context: readFeedContext,
                modelClass: ModelClass.MEDIUM,
                schema: ReadFeedSchema,
            });
        } catch (error: any) {
            callback?.({
                text: `There are missing arguments in your request.`,
                content: { error: "Generate object failed" },
            });
            return false;
        }
        const callArguments = content.object;

        // Validate reading of a feed content
        if (!isReadFeedContent(callArguments)) {
            elizaLogger.error("Invalid content for READ_FEED action.");
            callback?.({
                text: "Unable to process reading request. Invalid content provided.",
                content: { error: "Invalid reading content" },
            });
            return false;
        }


        // This action reads off the given network's FTSO
        const networkService = createNetworkService(
            callArguments.network as string
        )
        try {
            const feedInfo = await networkService.readFeedFtso(
                runtime,
                callArguments.feed as string
            );
            const timestamp = feedInfo[2];
            const date = new Date(parseInt(timestamp) * 1000);
            const value = formatUnits(feedInfo[0], feedInfo[1]);
            if (callback) {
                callback({
                    text: `At the time ${date.toLocaleString()}, the value of ${callArguments.feed} on ${callArguments.network}'s FTSO is ${value} USD.`
                });
                return true;
            }
        } catch (error: any) {
            callback?.({
                text: `FTSO information fetch failed with: ${error}`,
                content: { error: "FTSO fetch failed" },
            });
        }

        return true;
    },
    examples: getReadFeedExamples as ActionExample[][],
} as Action;


