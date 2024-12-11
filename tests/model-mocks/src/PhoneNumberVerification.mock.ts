import { faker } from "@faker-js/faker";
import type { PhoneNumberVerification } from "app-models/models/PhoneNumberVerificationModel";
import { generateIdWithPrefix } from "app-models/utils/generateId";
import type { FlattenMaps } from "mongoose";
import { generatePhoneNumber } from "#PhoneNumber.mock.ts";

export function generatePhoneNumberVerification(): FlattenMaps<PhoneNumberVerification> {
    return {
        _id: generateIdWithPrefix("pnv")(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        __v: faker.number.int(),
        callingCountryCode: "1",
        countryCode: "US",
        nationalFormat: "(...) ...-....",
        valid: faker.datatype.boolean(),
        expiredAt: faker.date.future(),
        phoneNumber: generatePhoneNumber(),
        verified: faker.datatype.boolean(),
        retryCount: faker.number.int(),
    };
}

export const DefaultPhoneNumberVerification = generatePhoneNumberVerification();
