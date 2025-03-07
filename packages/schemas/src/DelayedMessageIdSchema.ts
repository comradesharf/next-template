import { z } from "zod";

export const DelayedMessageIdSchema = z.custom<`delmsg_${string}`>(
    (value) => typeof value === "string" && /^delmsg_/.test(value),
);

export type DelayedMessageId = z.infer<typeof DelayedMessageIdSchema>;
