import { z } from "zod";
import { PresignedPostUrlIdSchema } from "#PresignedPostUrlIdSchema.ts";

export const CompleteFileUploadSchema = z.object({
    _id: PresignedPostUrlIdSchema,
});

export type CompleteFileUpload = z.infer<typeof CompleteFileUploadSchema>;
