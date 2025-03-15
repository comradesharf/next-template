import { z } from "zod";

export const FileUploadIdSchema = z.custom<`fu_${string}`>(
    (value) => typeof value === "string" && /^fu_/.test(value),
);

export type FileUploadId = z.infer<typeof FileUploadIdSchema>;
