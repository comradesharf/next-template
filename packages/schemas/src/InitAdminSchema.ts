import { z } from "zod";

export const InitAdminSchema = z.object({
    displayName: z.string().trim(),
    email: z.string().trim().email(),
    timezone: z.string().optional(),
});

export type InitAdmin = z.infer<typeof InitAdminSchema>;
