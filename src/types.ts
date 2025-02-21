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

export const DelegateTokensSchema = z.object({
    network: z.string(),
    delegated: z.string(),
    bips: z.number(),
});

export const GetStatsSchema = z.object({
    network: z.string(),
});

export const ReadFeedSchema = z.object({
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
    network: z.string(),
    message: z.string(),
})

export const CheckSignatureSchema = z.object({
    network: z.string(),
    message: z.string(),
    signature: z.string(),
    signerAddress: z.string(),
})
