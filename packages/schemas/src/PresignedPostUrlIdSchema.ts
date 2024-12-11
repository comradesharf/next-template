import { z } from "zod";

export const PresignedPostUrlIdSchema = z.custom<`ppu_${string}`>(
    (value) => typeof value === "string" && /^ppu_/.test(value),
);

export type PresignedPostUrlId = z.infer<typeof PresignedPostUrlIdSchema>;
