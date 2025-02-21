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
    feed: string;
}

function isReadFeedContent(
    runtime: IAgentRuntime,
    content: any
): content is ReadFeedContent {
    // elizaLogger.debug("Content for reading a feed", content);
    console.log("Content for reading a feed", content);
    return (
        typeof content.feed === "string"
    );
}



export const readFeedAction: Action = {
    name: "READ_FEED",
    similes: [
        "READ_FEEDS",
        "FTSO_FEED"
    ],
    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        await validateFlareConfig(runtime);
        return true;
    },
    description:
        `MUST use this action if the user requests to read a feed on the FTSO, 
        the request might be varied, but it will always be a query about FTSO feeds. 
        The actions reads the feed off the Coston's FTSO
        DO NOT use it, if it only asks for current balance.`,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ) => {
        console.log("Starting READ_FEED handler...");


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

        // Generate reading of a feed content
        const content = await generateObject({
            runtime,
            context: readFeedContext,
            modelClass: ModelClass.SMALL,
            schema: ReadFeedSchema,
        });
        const callArguments = content.object;

        // Validate reading of a feed content
        if (!isReadFeedContent(runtime, callArguments)) {
            elizaLogger.error("Invalid content for READ_FEED action.");
            callback?.({
                text: "Unable to process reading request. Invalid content provided.",
                content: { error: "Invalid reading content" },
            });
            return false;
        }


        // This action always reads off the Coston2's FTSO
        const networkService = createNetworkService(
            "coston2"
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
                    text: `At the time ${date.toLocaleString()}, the value of ${callArguments.feed} on Coston2's FTSO is ${value} USD.`
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


