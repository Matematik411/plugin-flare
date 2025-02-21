import { Plugin } from "@elizaos/core";
import { checkSignatureAction } from "./actions/checkSignature";
import { delegateTokensAction } from "./actions/delegateTokens";
import { getStatsAction } from "./actions/getStats";
import { readFeedAction } from "./actions/readFeed";
import { signMessageAction } from "./actions/signMessage";
import { transferAction } from "./actions/transfer";
import { wrapTokensAction } from "./actions/wrapTokens";
import { walletProvider } from "./providers/wallet";

export const flarePlugin: Plugin = {
    name: "flare",
    description: "Flare plugin for Eliza",
    actions: [
        getStatsAction,
        transferAction,
        wrapTokensAction,
        delegateTokensAction,
        readFeedAction,
        signMessageAction,
        checkSignatureAction,
    ],
    // evaluators analyze the situations and actions taken by the agent. they run after each agent action
    // allowing the agent to reflect on what happened and potentially trigger additional actions or modifications
    evaluators: [],
    // providers supply information and state to the agent's context, help agent access necessary data
    providers: [walletProvider],
};
export default flarePlugin;