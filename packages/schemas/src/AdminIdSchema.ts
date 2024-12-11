import { z } from 'zod';

export const AdminIdSchema = z.custom<`adm_${string}`>(
    (value) => typeof value === "string" && /^adm_/.test(value),
);

export type AdminId = z.infer<typeof AdminIdSchema>;
