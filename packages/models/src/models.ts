import {
    getDiscriminatorModelForClass,
    getModelForClass,
} from "@typegoose/typegoose";
import * as StructAdmin from "#Admin.ts";
import * as StructDelayedMessage from "#DelayedMessage.ts";
import * as StructFileUpload from "#FileUpload.ts";
import type * as StructPlace from "#Place.ts";
import * as StructUser from "#User.ts";

export type { StructPlace };

export const UserModel = getModelForClass(StructUser.User);

export type { StructUser };

export const AdminModel = getDiscriminatorModelForClass(
    UserModel,
    StructAdmin.Admin,
    "ADMIN",
);

export type { StructAdmin };

export const FileUploadModel = getModelForClass(StructFileUpload.FileUpload);

export type { StructFileUpload };

export const DelayedMessageModel = getModelForClass(
    StructDelayedMessage.DelayedMessage,
);

export type { StructDelayedMessage };
