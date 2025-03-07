import { faker } from "@faker-js/faker";
import { generateIdWithPrefix } from "app-models/model-utils";
import type { StructAdmin } from "app-models/models";
import type { FlattenMaps } from "mongoose";
import type { Overwrites } from "#utils.ts";

export function generateAdmin({
    _id = generateIdWithPrefix("adm")(),
    createdAt = faker.date.past(),
    updatedAt = faker.date.past(),
    __v = faker.number.int(),
    displayName = faker.internet.displayName(),
    role = "ADMIN",
    timezone = "UTC",
    accessSecret = generateIdWithPrefix("api")(),
    email = faker.internet.email(),
    locale = "en",
}: Overwrites<StructAdmin.Admin> = {}): FlattenMaps<StructAdmin.Admin> {
    return {
        _id,
        createdAt,
        updatedAt,
        __v,
        displayName,
        role,
        timezone,
        accessSecret,
        email,
        locale,
    };
}

export const DefaultAdmin = generateAdmin();
