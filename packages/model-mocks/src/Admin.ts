import type { Admin } from '@comradesharf/models/models/Admin';
import { generateIdWithPrefix } from '@comradesharf/models/models/Base';
import { faker } from '@faker-js/faker';
import { fn } from '@vitest/spy';
import type { FlattenMaps } from 'mongoose';

export function generateAdmin(): FlattenMaps<Admin> {
    return {
        _id: generateIdWithPrefix('adm')(),
        created_at: faker.date.past(),
        updated_at: faker.date.past(),
    };
}

export const DefaultAdmin = generateAdmin();
