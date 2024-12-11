import { faker } from "@faker-js/faker";
import { fn } from "@vitest/spy";
import type { Admin } from "app-models/models/AdminModel";
import { generateIdWithPrefix } from "app-models/utils/generateId";
import type { FlattenMaps } from "mongoose";

export function generateAdmin(): FlattenMaps<Admin> {
    return {
        _id: generateIdWithPrefix("adm")(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        __v: faker.number.int(),
        displayName: faker.internet.displayName(),
        role: "ADMIN",
        timezone: "UTC",
        accessSecret: generateIdWithPrefix("api")(),
        email: faker.internet.email(),
        passwordHash: faker.internet.password(),
        verifyPassword: fn(),
    };
}

export const DefaultAdmin = generateAdmin();
