import { z } from "zod";

export const GeneratePresignedPostUrlSchema = z.object({
    keyPrefix: z.enum(["brand_logos"]),
    type: z.string().trim(),
    name: z.string().trim().min(1),
    meta: z.record(z.string()).default({}),
});

export type GeneratePresignedPostUrl = z.infer<
    typeof GeneratePresignedPostUrlSchema
>;
