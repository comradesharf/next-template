import { getModelForClass } from "@typegoose/typegoose";
import { PresignedPostUrl } from "#models/PresignedPostUrl.ts";

export const PresignedPostUrlModel = getModelForClass(PresignedPostUrl);

export type { PresignedPostUrl };
