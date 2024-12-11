import { getModelForClass } from "@typegoose/typegoose";
import { User } from "#models/User.ts";

export const UserModel = getModelForClass(User);

export type { User };
