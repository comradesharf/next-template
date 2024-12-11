import { z } from "zod";

export const VerifyEmailSchema = z.object({
    otp: z.string().regex(/^[a-f0-9]{5}$/),
});

export type VerifyEmail = z.infer<typeof VerifyEmailSchema>;
