import { z } from "zod";
import { FileUploadIdSchema } from "#FileUploadIdSchema.ts";

export const CompleteFileUploadSchema = z.object({
    _id: FileUploadIdSchema,
});

export type CompleteFileUpload = z.infer<typeof CompleteFileUploadSchema>;
