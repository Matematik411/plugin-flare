import { IAgentRuntime } from "@elizaos/core";
import {
    Address,
    Chain,
    createPublicClient,
    createWalletClient,
    Hash,
    http
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { flare, flareTestnet, songbird, songbirdTestnet } from "viem/chains";

export const networks: { [name: string]: Chain } = {
    "flare": flare,
    "coston2": flareTestnet,
    "flaretestnetcoston2": flareTestnet,
    "songbird": songbird,
    "coston": songbirdTestnet,
    "songbirdtestnetcoston": songbirdTestnet,
}

export const getNetwork = (chainName: string) => {
    return networks[chainName.toLowerCase().replaceAll(" ", "")] || flareTestnet;
}


export const getAccount = (runtime: IAgentRuntime) => {
    const privateKey =
        runtime.getSetting("FLARE_PRIVATE_KEY") ||
        process.env.FLARE_PRIVATE_KEY;
    return privateKeyToAccount(`0x${privateKey.replace("0x", "")}`);
};

export const getPublicClient = (_runtime: IAgentRuntime, selectedChain: Chain) => {
    return createPublicClient({
        chain: selectedChain,
        transport: http(),
    });
};

type WalletClientType = ReturnType<typeof createWalletClient>

export const getWalletClient = (runtime: IAgentRuntime, selectedChain: Chain): WalletClientType => {
    return createWalletClient({
        account: getAccount(runtime),
        chain: selectedChain,
        transport: http(),
    });
};


export const getDecimals = async (
    selectedChain: Chain,
) => {
    return selectedChain.nativeCurrency.decimals;
};

export const getBalance = async (
    runtime: IAgentRuntime,
    selectedChain: Chain,
    owner: Address
) => {
    const publicClient = getPublicClient(runtime, selectedChain);
    const balance = await publicClient.getBalance({
        address: owner,
    });
    return balance;
};

export const getTxReceipt = async (runtime: IAgentRuntime, chainName: string, tx: Hash) => {
    const selectedChain = getNetwork(chainName);
    const publicClient = getPublicClient(runtime, selectedChain);
    const receipt = await publicClient.waitForTransactionReceipt({
        hash: tx,
    });
    return receipt;
};
