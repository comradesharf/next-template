import { z } from 'zod';

export const MemberIdSchema = z.custom<`mbr_${string}`>(
    (value) => typeof value === "string" && /^mbr_/.test(value),
);

export type MemberId = z.infer<typeof MemberIdSchema>;
