import { IAgentRuntime } from "@elizaos/core";
import { Address, bytesToHex, Hash, keccak256, numberToBytes, parseEther, parseSignature, parseUnits, toBytes } from "viem";
import {
    AuthorizationResponse,
    IntermediaryForm,
    ProcessReturn,
    StatsResponse
} from "./types";
import { getAccount, getDecimals, getNetwork, getPublicClient, getWalletClient } from "./utils";
import contractsData from "./utils/contracts.json" assert { type: "json" };

interface ContractABIs {
    [contractName: string]: any[];
}
interface ContractAddresses {
    [contractName: string]: Address;
}
interface TargetUrls {
    [name: string]: string
}

export const createNetworkService = (chainName: string) => {
    // Setup network and contract data
    const selectedChain = getNetwork(chainName);
    const contractABIs: ContractABIs = contractsData["ABIs"];
    const contractAddresses: ContractAddresses = contractsData["addresses"][selectedChain.name];
    const targetUrls: TargetUrls = contractsData["urls"];

    // Returns the address of the requested contract
    const getContractAddress = async (
        runtime: IAgentRuntime,
        contractName: string,
        registryName?: string
    ): Promise<Address> => {
        // Read the address from the utils file
        // In case of the intermediary, it returns struct with two addresses
        const contractAddress = contractAddresses[contractName];

        // If the first contract is the FlareContractRegistry, we read the final address on it
        if (typeof registryName !== "undefined") {
            const publicClient = getPublicClient(runtime, selectedChain);
            const readAddress = await publicClient.readContract({
                account: getAccount(runtime),
                address: contractAddress,
                abi: contractABIs["contractRegistry"],
                functionName: "getContractAddressByName",
                args: [registryName]
            }) as any;
            return readAddress as Address;
        }
        return contractAddress;
    }

    // Makes a POST request to an url
    async function postData(url: string, data: any) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Failed to post: ${response.statusText}`);
        }

        return await response.json();
    }

    // Returns stats of the network from the explorer's API
    const getStats = async (): Promise<StatsResponse> => {
        // Set url and fetch data from it
        const url = selectedChain.blockExplorers.default.apiUrl + "/v2/stats"
        try {
            const response = await fetch(url);

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error?.message || response.statusText);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error(`[STATS] Flare API Error: ${error.message}`);
            throw error;
        }
    }

    // Executes a token transfer and returns the hash of the transaction
    const transferTokens = async (
        runtime: IAgentRuntime,
        recipient: Address,
        amount: number
    ): Promise<Hash> => {
        const walletClient = getWalletClient(runtime, selectedChain);
        const decimals = await getDecimals(
            selectedChain
        );

        try {
            const tx = await walletClient.sendTransaction({
                account: getAccount(runtime),
                to: recipient,
                value: parseUnits(amount.toString(), decimals)
            } as any);
            return tx as Hash;
        } catch (error: any) {
            console.log(`[TRANSFER] Error transferring tokens: ${error.message}`);
            return;
        }
    }

    // Returns the string id for the requested feed on the ftso
    const getFeedId = (category: string, feedName: string): string => {
        // Constructs the feed id
        const hexFeedName = Array.from(feedName)
            .map((c: string) => c.charCodeAt(0).toString(16).padStart(2, "0"))
            .join("");
        const paddedHexString = (category + hexFeedName).padEnd(42, "0");
        return `${paddedHexString}`;
    }

    // Reads the feed from the ftso and returns the value
    const readFeedFtso = async (
        runtime: IAgentRuntime,
        feed: string
    ): Promise<number> => {
        const publicClient = getPublicClient(runtime, selectedChain);
        const ftsoAddress = await getContractAddress(runtime, "contractRegistry", "FtsoV2");
        const feedId = "0x" + getFeedId("01", `${feed}/USD`);

        try {
            const feedValue = await publicClient.readContract({
                account: getAccount(runtime),
                address: ftsoAddress,
                abi: contractABIs["ftso"],
                functionName: "getFeedById",
                args: [feedId]
            }) as any;
            return feedValue as number;
        } catch (error: any) {
            console.log(`[READ FEED] Error in reading the ftso feed: ${error.message}`);
            return
        }
    }

    // Wraps or unwraps the requested tokens and returns the hash of the transaction
    const wrapTokens = async (
        runtime: IAgentRuntime,
        action: string,
        amount: number,
    ): Promise<Hash> => {
        const publicClient = getPublicClient(runtime, selectedChain);
        const wNatAddress = await getContractAddress(runtime, "contractRegistry", "WNat");

        let functionName: string;
        let sentValue: number;
        let functionArgs: any[];

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

        try {
            const { result, request } = await publicClient.simulateContract({
                account: getAccount(runtime),
                address: wNatAddress,
                abi: contractABIs["wNat"],
                functionName: functionName,
                args: functionArgs,
                dataSuffix: "0x",
                value: parseEther(sentValue.toString())
            });

            const walletClient = getWalletClient(runtime, selectedChain);
            const tx = await walletClient.writeContract(request);
            return tx as Hash

        } catch (error: any) {
            console.log(`[WRAP] Error simulating the contract: ${error.message}`);
            return;
        }

    }

    // Delegates requested tokens and returns the hash of the transaction
    const delegateTokens = async (
        runtime: IAgentRuntime,
        delegated: string,
        bips: number
    ): Promise<Hash> => {
        const publicClient = getPublicClient(runtime, selectedChain);
        const wNatAddress = await getContractAddress(runtime, "contractRegistry", "WNat");
        try {
            const { result, request } = await publicClient.simulateContract({
                account: getAccount(runtime),
                address: wNatAddress,
                abi: contractABIs["wNat"],
                functionName: "delegate",
                args: [
                    delegated,
                    bips
                ],
                dataSuffix: "0x",
            });
            const walletClient = getWalletClient(runtime, selectedChain);
            const tx = await walletClient.writeContract(request);
            return tx as Hash

        } catch (error: any) {
            console.log(`[DELEGATE] Error simulating the contract: ${error.message}`);
            return;
        }

    }

    // Returns the signature of the message signed by the user
    const signMessage = async (
        runtime: IAgentRuntime,
        message: string,
    ): Promise<string> => {
        // hash and sign the message (double keccak is used)
        const walletClient = getWalletClient(runtime, selectedChain);
        const messageHash = keccak256(toBytes(message));

        try {
            const signature = await walletClient.signMessage({
                account: getAccount(runtime),
                message: { raw: messageHash },
            });
            return signature;
        } catch (error: any) {
            console.log(`[SIGN MESSAGE] Error constructing the signature: ${error.message}`);
            return;
        }
    }

    // Checks if the signature of a message is valid and returns the result
    const checkMessageSignature = async (
        runtime: IAgentRuntime,
        message: string,
        signature: string,
        signerAddress: string,
    ): Promise<boolean> => {
        const publicClient = getPublicClient(runtime, selectedChain);
        const verifierAddress = await getContractAddress(runtime, "verifier");

        try {
            const isValid = await publicClient.readContract({
                account: getAccount(runtime),
                address: verifierAddress,
                abi: contractABIs["verifier"],
                functionName: "verify",
                args: [
                    signerAddress,
                    message,
                    signature
                ]
            }) as any;
            return isValid as boolean;
        } catch (error: any) {
            console.log(`[CHECK SIGNATURE] Error reading the contract: ${error.message}`);
            return;
        }

    }

    // Returns the signatures for an authorized token transfer
    const signAuthorizedTransfer = async (
        runtime: IAgentRuntime,
        amount: number,
        recipient: Address,
        nonce: number,
    ): Promise<ProcessReturn> => {
        const publicClient = getPublicClient(runtime, selectedChain);
        const walletClient = getWalletClient(runtime, selectedChain);

        // Get token address 
        const tokenAddress = await getContractAddress(runtime, "token");

        const types = {
            TransferWithAuthorization: [
                { name: "from", type: "address" },
                { name: "to", type: "address" },
                { name: "value", type: "uint256" },
                { name: "validAfter", type: "uint256" },
                { name: "validBefore", type: "uint256" },
                { name: "nonce", type: "bytes32" },
            ],
        };

        try {
            // Get decimals and name of the token
            const tokenName: string = await publicClient.readContract({
                account: getAccount(runtime),
                address: tokenAddress,
                abi: contractABIs["token"],
                functionName: "name",
                args: []
            }) as any as string
            const tokenDecimals: number = await publicClient.readContract({
                account: getAccount(runtime),
                address: tokenAddress,
                abi: contractABIs["token"],
                functionName: "decimals",
                args: []
            }) as any as number

            // Get token transfer signature
            const domain = {
                name: tokenName,
                version: "1",
                chainId: selectedChain.id,
                verifyingContract: tokenAddress,
            };
            const values = {
                "from": getAccount(runtime).address,
                "to": recipient,
                "value": parseUnits(amount.toString(), tokenDecimals),
                "validAfter": 0,
                "validBefore": Math.floor(Date.now() / 1000) + 3600, // set to 1h since its immediately executed anyways
                "nonce": bytesToHex(numberToBytes(nonce, { size: 32 })),
            };
            const signature = await walletClient.signTypedData({
                account: getAccount(runtime),
                domain: domain,
                types: types,
                primaryType: "TransferWithAuthorization",
                message: values,
            });
            const sig = parseSignature(signature);

            // Send the signature to the executor
            const executorUrl = targetUrls["gaslessBackend"] + "/api/v0/signed-message";
            const postValues = {
                "from_address": values.from,
                "to_address": values.to,
                "value": values.value.toString(),
                "nonce": values.nonce,
                "valid_after": values.validAfter,
                "valid_before": values.validBefore,
                "r": sig.r,
                "s": sig.s,
                "v": sig.v.toString()
            }
            let response: AuthorizationResponse = await postData(executorUrl, postValues);

            if (response.processed === "unprocessed") {
                // transaction is not processed yet
                console.log("Requested authorized transfer isn't processed yet. Waiting 5 seconds before trying again.");
                const urlCheck = targetUrls["gaslessBackend"] + `/api/v0/signed-message/${response.id}`;

                // wait 5 seconds before checking again
                await new Promise(resolve => setTimeout(resolve, 5000));
                response = await (await fetch(urlCheck)).json();
            }

            // if request was processed return the hash
            if (response.processed === "processed") {
                return { success: true, txHash: response.tx_hash as Hash };
            }
            else {
                const urlCheck = targetUrls["gaslessBackend"] + `/api/v0/signed-message/${response.id}`;
                return { success: false, url: urlCheck };
            }

        } catch (error: any) {
            console.log(`[SIGN AUTHORIZATION] Error constructing the signature: ${error.message}`);
            return;
        }

    }

    // Returns the signatures for a token transaction and payment of an intermediary
    const signIntermediary = async (
        runtime: IAgentRuntime,
        amount: number,
        recipient: Address,
        duration: number,
        nonce: number,
        fee: string
    ): Promise<IntermediaryForm> => {
        const publicClient = getPublicClient(runtime, selectedChain);
        const walletClient = getWalletClient(runtime, selectedChain);
        const decimals = await getDecimals(selectedChain);
        // This contains both intermediary and token addresses
        const intermediaryAddress = await getContractAddress(runtime, "intermediary");
        const tokenAddress = await getContractAddress(runtime, "token");

        const types = {
            SponsorReceiveWithAuthorization: [
                { name: "from", type: "address" },
                { name: "to", type: "address" },
                { name: "value", type: "uint256" },
                { name: "validAfter", type: "uint256" },
                { name: "validBefore", type: "uint256" },
                { name: "nonce", type: "bytes32" },
                { name: "fee", type: "uint256" },
            ],
            ReceiveWithAuthorization: [
                { name: "from", type: "address" },
                { name: "to", type: "address" },
                { name: "value", type: "uint256" },
                { name: "validAfter", type: "uint256" },
                { name: "validBefore", type: "uint256" },
                { name: "nonce", type: "bytes32" },
            ],
        };

        try {
            // intermediary's name contains the tokens name, e.g. TransferIntermediary-MyToken
            const intermediaryName: string = await publicClient.readContract({
                account: getAccount(runtime),
                address: intermediaryAddress,
                abi: contractABIs["intermediary"],
                functionName: "contractName",
                args: []
            }) as any as string
            const tokenName = intermediaryName.split("-").slice(1).join("-")
            const latestTimestamp = Math.floor(Date.now() / 1000) + duration;

            // Get token transfer signature
            const domain = {
                name: tokenName,
                version: "1.0",
                chainId: selectedChain.id,
                verifyingContract: tokenAddress,
            };
            const values = {
                "from": getAccount(runtime).address,
                "to": intermediaryAddress,
                "value": parseUnits(amount.toString(), decimals),
                "validAfter": 0,
                "validBefore": latestTimestamp,
                "nonce": bytesToHex(numberToBytes(nonce, { size: 32 })),
            };
            const signature = await walletClient.signTypedData({
                account: getAccount(runtime),
                domain: domain,
                types: types,
                primaryType: "ReceiveWithAuthorization",
                message: values,
            });

            // Get sponsor's fee signature
            const domainSponsor = {
                name: intermediaryName,
                version: "1",
                chainId: selectedChain.id,
                verifyingContract: intermediaryAddress
            };
            const valuesSponsor = {
                "from": getAccount(runtime).address,
                "to": recipient,
                "value": parseUnits(amount.toString(), decimals),
                "validAfter": 0,
                "validBefore": latestTimestamp,
                "nonce": bytesToHex(numberToBytes(nonce, { size: 32 })),
                "fee": parseUnits(fee, decimals)
            };
            const intermediarySignature = await walletClient.signTypedData({
                account: getAccount(runtime),
                domain: domainSponsor,
                types: types,
                primaryType: "SponsorReceiveWithAuthorization",
                message: valuesSponsor
            }) as any

            const constructedData: IntermediaryForm = {
                ...valuesSponsor, signature, intermediarySignature
            };
            return constructedData;
        } catch (error: any) {
            console.log(`[SIGN INTERMEDIARY] Error constructing the signature: ${error.message}`);
            return;
        }

    }

    return { getStats, transferTokens, readFeedFtso, wrapTokens, delegateTokens, signMessage, checkMessageSignature, signAuthorizedTransfer, signIntermediary };
}
