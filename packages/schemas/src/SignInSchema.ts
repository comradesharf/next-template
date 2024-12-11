import { z } from "zod";

export const SignInSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().trim().min(6).max(100),
});

export type SignIn = z.infer<typeof SignInSchema>;
