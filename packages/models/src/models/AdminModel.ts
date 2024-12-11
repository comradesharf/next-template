import { getDiscriminatorModelForClass } from "@typegoose/typegoose";
import { Admin } from "#models/Admin.ts";
import { UserModel } from "#models/UserModel.ts";

export const AdminModel = getDiscriminatorModelForClass(
    UserModel,
    Admin,
    "ADMIN",
);

export type { Admin };
