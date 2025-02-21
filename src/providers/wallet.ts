import {
    IAgentRuntime,
    Memory,
    Provider,
    State
} from "@elizaos/core";
import { formatUnits } from "viem";
import { networks } from "../utils";
import { getAccount, getBalance, getDecimals } from "../utils/index";

const walletProvider: Provider = {
    get: async (runtime: IAgentRuntime, _message: Memory, _state?: State) => {
        const privateKey = runtime.getSetting("FLARE_PRIVATE_KEY");
        if (!privateKey) {
            throw new Error(
                "FLARE_PRIVATE_KEY not found in environment variables"
            );
        }

        const account = getAccount(runtime);

        // This has to be in nice formatting, so that the LM can get informations from it.
        let output = `# Wallet Address ${account.address}\n\n`;
        output += `## Wallet balances:\n\n`;
        for (const chain of Object.values(networks)) {
            const balance = await getBalance(
                runtime,
                chain,
                account.address
            );
            const decimals = await getDecimals(chain);
            output += `on chain ${chain.name}: the balance is ${formatUnits(balance, decimals)} ${chain.nativeCurrency.symbol}\n`;
        }

        return output;
    },
};

export { walletProvider };
