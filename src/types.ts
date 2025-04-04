import { Hash } from "viem";
import { z } from "zod";

export interface StatsResponse {
    total_blocks: number;
    total_addresses: number;
    total_transactions: number;
    average_block_time: number;
    coin_price: number;
    total_gas_used: number;
    transactions_today: number;
    gas_used_today: number;
}

export interface AuthorizationResponse {
    id: number;
    tx_hash: string;
    processed: string;
}

export interface IntermediaryForm {
    from: string;
    to: string;
    value: bigint;
    validAfter: number;
    validBefore: number;
    nonce: string;
    signature: string;
    fee: bigint;
    intermediarySignature: number;
}

export type ProcessReturn =
    | { success: true; txHash: Hash }
    | { success: false; url: string }

export const DelegateTokensSchema = z.object({
    network: z.string(),
    delegated: z.string(),
    bips: z.number(),
});

export const GetStatsSchema = z.object({
    network: z.string(),
});

export const ReadFeedSchema = z.object({
    network: z.string(),
    feed: z.string(),
});

export const TransferSchema = z.object({
    network: z.string(),
    recipient: z.string(),
    amount: z.number(),
});

export const WrapTokensSchema = z.object({
    network: z.string(),
    action: z.string(),
    amount: z.number(),
});

export const SignMessageSchema = z.object({
    message: z.string(),
})

export const CheckSignatureSchema = z.object({
    message: z.string(),
    signature: z.string(),
    signerAddress: z.string(),
})

export const SignAuthorizationSchema = z.object({
    amount: z.number(),
    recipient: z.string(),
    nonce: z.number(),
})

export const SignIntermediarySchema = z.object({
    amount: z.number(),
    recipient: z.string(),
    duration: z.number(),
    nonce: z.number(),
    fee: z.string(),
})
