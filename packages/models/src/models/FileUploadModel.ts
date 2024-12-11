import { getModelForClass } from "@typegoose/typegoose";
import { FileUpload } from "#models/FileUpload.ts";

export const FileUploadModel = getModelForClass(FileUpload);

export type { FileUpload };
