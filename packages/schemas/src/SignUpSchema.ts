import { z } from 'zod';

export const SignUpSchema = z
    .object({
        display_name: z.string().trim().min(1).max(100),
        email: z.string().trim().email(),
        password: z.string().trim().min(6).max(100),
        confirm_password: z.string().trim().min(6).max(100),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirm_password) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['password'],
            });
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['confirm_password'],
            });
        }
    });

export type SignUp = z.infer<typeof SignUpSchema>;
