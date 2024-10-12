import { z } from 'zod';

export const SignUpSchema = z.object({});

export type SignUp = z.infer<typeof SignUpSchema>;
