import { getDiscriminatorModelForClass } from "@typegoose/typegoose";
import { Member } from "#models/Member.ts";
import { UserModel } from "#models/UserModel.ts";

export const MemberModel = getDiscriminatorModelForClass(
    UserModel,
    Member,
    "MEMBER",
);

export type { Member };
