import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const flareEnvSchema = z.object({
    FLARE_PRIVATE_KEY: z.string().min(1, "Flare API key is required"),
});

export type flareConfig = z.infer<typeof flareEnvSchema>;

export async function validateFlareConfig(
    runtime: IAgentRuntime
): Promise<flareConfig> {
    try {
        const config = {
            FLARE_PRIVATE_KEY: runtime.getSetting("FLARE_PRIVATE_KEY"),
        };
        return flareEnvSchema.parse(config);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `Flare API configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}