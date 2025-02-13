import { getModelForClass } from "@typegoose/typegoose";
import * as StructUser from "#User.ts";

export const UserModel = getModelForClass(StructUser.User);

export type { StructUser };
