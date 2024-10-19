import type { Admin } from '@comradesharf/models/models/Admin';
import { faker } from '@faker-js/faker';
import { fn } from '@vitest/spy';
import type { FlattenMaps } from 'mongoose';
import { typeid } from 'typeid-js';

export function generateAdmin(): FlattenMaps<Admin> {
    return {
        _id: typeid('adm').toString(),
        created_at: faker.date.past(),
        updated_at: faker.date.past(),
        display_name: faker.person.fullName(),
        email: faker.internet.email(),
        password_hash: faker.string.alphanumeric(),
        role: 'ADMIN',
        timezone: faker.date.timeZone(),
        verifyPassword: fn(),
    };
}

export const DefaultAdmin = generateAdmin();
