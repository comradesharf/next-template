import { getModelForClass } from "@typegoose/typegoose";
import { PhoneNumberVerification } from "#models/PhoneNumberVerification.ts";

export const PhoneNumberVerificationModel = getModelForClass(
    PhoneNumberVerification,
);

export type { PhoneNumberVerification };
