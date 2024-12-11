import { z } from "zod";

export const PhoneNumberVerificationIdSchema = z.custom<`pnv_${string}`>(
    (value) => typeof value === "string" && /^pnv_/.test(value),
);

export type PhoneNumberVerificationId = z.infer<
    typeof PhoneNumberVerificationIdSchema
>;
