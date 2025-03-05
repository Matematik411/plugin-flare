import { IAgentRuntime } from "@elizaos/core";
import { Address, Hash, keccak256, parseEther, parseUnits, toBytes } from "viem";
import {
    StatsResponse
} from "./types";
import { getAccount, getDecimals, getNetwork, getPublicClient, getWalletClient } from "./utils";

export const createNetworkService = (chainName: string) => {
    const selectedChain = getNetwork(chainName);

    const getAddress = async (
        runtime: IAgentRuntime,
        contractName: string,
    ): Promise<string> => {
        if (contractName == "Verifier") {
            const verifier = runtime.getSetting(`${chainName.toUpperCase().replaceAll(" ", "")}_VERIFIER`);
            return verifier;
        }
        else {
            const publicClient = getPublicClient(runtime, selectedChain);
            const flareContractRegistry = runtime.getSetting("CONTRACT_REGISTRY");
            const address = await publicClient.readContract({
                address: flareContractRegistry,
                abi: [{
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                        }
                    ],
                    "name": "getContractAddressByName",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },],
                functionName: "getContractAddressByName",
                args: [contractName]

            });
            return address;
        }
    }

    const getStats = async (): Promise<StatsResponse> => {
        try {
            const url = selectedChain.blockExplorers.default.apiUrl + "/v2/stats"
            const response = await fetch(url);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error?.message || response.statusText);
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error("Flare API Error (fetching stats):", error.message);
            throw error;
        }
    }

    const transferTokens = async (
        runtime: IAgentRuntime,
        recipient: Address,
        amount: number
    ): Promise<Hash> => {
        const walletClient = getWalletClient(runtime, selectedChain);
        const decimals = await getDecimals(
            selectedChain
        );
        const tx = await walletClient.sendTransaction({
            to: recipient,
            value: parseUnits(amount.toString(), decimals),
        });
        return tx as Hash;
    }

    const getFeedId = (category: string, feedName: string): string => {
        const hexFeedName = Array.from(feedName)
            .map((c: string) => c.charCodeAt(0).toString(16).padStart(2, "0"))
            .join("");
        const paddedHexString = (category + hexFeedName).padEnd(42, "0");
        return `${paddedHexString}`;
    }

    const readFeedFtso = async (
        runtime: IAgentRuntime,
        feed: string
    ): Promise<number> => {
        const publicClient = getPublicClient(runtime, selectedChain);
        const ftsoAddress = await getAddress(runtime, "FtsoV2")
        const feedId = "0x" + getFeedId("01", `${feed}/USD`);
        const feedValue = await publicClient.readContract({
            address: ftsoAddress,
            abi: [{
                "inputs": [
                    {
                        "internalType": "bytes21",
                        "name": "_feedId",
                        "type": "bytes21"
                    }
                ],
                "name": "getFeedById",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "int8",
                        "name": "",
                        "type": "int8"
                    },
                    {
                        "internalType": "uint64",
                        "name": "",
                        "type": "uint64"
                    }
                ],
                "stateMutability": "payable",
                "type": "function"
            }],
            functionName: "getFeedById",
            args: [feedId]

        });
        return feedValue;
    }

    const wrapTokens = async (
        runtime: IAgentRuntime,
        action: string,
        amount: number,
    ) => {
        const publicClient = getPublicClient(runtime, selectedChain);
        const wNatAddress = await getAddress(runtime, "WNat");

        let functionName: string;
        let sentValue: number;
        let functionArgs: BigInt[];

        try {
            if (action == "wrap") {
                functionName = "deposit";
                sentValue = amount;
                functionArgs = [];
            } else {
                const decimals = await getDecimals(selectedChain);
                functionName = "withdraw";
                sentValue = 0;
                functionArgs = [parseUnits(amount.toString(), decimals)]
            };

            const { result, request } = await publicClient.simulateContract({
                account: getAccount(runtime),
                address: wNatAddress,
                abi: [{
                    "inputs": [],
                    "name": "deposit",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "withdraw",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }],
                functionName: functionName,
                args: functionArgs,
                dataSuffix: "0x",
                value: parseEther(sentValue.toString())
            });

            const walletClient = getWalletClient(runtime, selectedChain);
            const tx = await walletClient.writeContract(request);
            return tx as Hash

        } catch (error) {
            console.log(`[WRAP] Error simulating the contract: ${error}`);
            return;
        }

    }

    const delegateTokens = async (
        runtime: IAgentRuntime,
        delegated: string,
        bips: number
    ) => {
        const publicClient = getPublicClient(runtime, selectedChain);
        const wNatAddress = await getAddress(runtime, "WNat");
        try {
            const { result, request } = await publicClient.simulateContract({
                account: getAccount(runtime),
                address: wNatAddress,
                abi: [{
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_bips",
                            "type": "uint256"
                        }
                    ],
                    "name": "delegate",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }],
                functionName: "delegate",
                args: [
                    delegated,
                    bips
                ],
                dataSuffix: "0x"
            });
            const walletClient = getWalletClient(runtime, selectedChain);
            const tx = await walletClient.writeContract(request);
            return tx as Hash

        } catch (error) {
            console.log(`[DELEGATE] Error simulating the contract: ${error}`);
            return;
        }

    }

    const signMessage = async (
        runtime: IAgentRuntime,
        message: string,
    ) => {

        try {
            // hash and sign the message (double keccak is used)
            const walletClient = getWalletClient(runtime, selectedChain);
            const messageHash = keccak256(toBytes(message));
            const signature = await walletClient.signMessage({ message: { raw: messageHash } });

            return signature;
        } catch (error) {
            console.log(`[SIGN MESSAGE] Error constructing the signature: ${error}`);
            return;
        }
    }

    const checkMessageSignature = async (
        runtime: IAgentRuntime,
        message: string,
        signature: string,
        signerAddress: string,
    ) => {
        try {
            const publicClient = getPublicClient(runtime, selectedChain);
            const verifierAddress = getAddress(runtime, "Verifier");
            const isValid = await publicClient.readContract({
                address: verifierAddress,
                abi: [
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "signer",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "message",
                                "type": "string"
                            },
                            {
                                "internalType": "bytes",
                                "name": "signature",
                                "type": "bytes"
                            }
                        ],
                        "name": "verify",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ],
                        "stateMutability": "pure",
                        "type": "function"
                    }
                ],
                functionName: "verify",
                args: [
                    signerAddress,
                    message,
                    signature
                ]
            });
            return isValid;

        } catch (error) {
            console.log(`[CHECK SIGNATURE] Error reading the contract: ${error}`);
            return;
        }

    }

    const signTokenTransfer = async (
        runtime: IAgentRuntime,
        amount: number,
        recipient: Address,
        duration: number
    ) => {
        const types = {
            Authorization: [
                { name: "from", type: "address" },
                { name: "to", type: "address" },
                { name: "value", type: "uint256" },
                { name: "validAfter", type: "uint256" },
                { name: "validBefore", type: "uint256" },
                { name: "nonce", type: "bytes32" },
            ],
        };
        const domain = {
            name: "MyToken",
            version: "1.0",
            chainId: selectedChain.id,
            veriyingContract: "0x0101010101010101010101010101010101010101"
        };

        // values from the query
        const value = {
            "from": getAccount(runtime).address,
            "to": recipient,
            "value": amount,
            "validAfter": Math.floor(Date.now() / 1000),
            "validBefore": Math.floor(Date.now() / 1000) + duration,
            "nonce": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
        };

        try {
            const walletClient = getWalletClient(runtime, selectedChain);
            const signature = await walletClient.signTypedData({
                account: getAccount(runtime),
                domain: domain,
                types: types,
                primaryType: "Authorization",
                message: value,
            })
            return signature;
        } catch (error) {
            console.log(`[SIGN TOKEN TRANSFER] Error constructing the signature: ${error}`);
            return;
        }

    }

    return { getStats, transferTokens, readFeedFtso, wrapTokens, delegateTokens, signMessage, checkMessageSignature, signTokenTransfer };
}


