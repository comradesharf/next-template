import type { Member } from '@comradesharf/models/models/Member';
import { faker } from '@faker-js/faker';
import { fn } from '@vitest/spy';
import type { FlattenMaps } from 'mongoose';
import { typeid } from 'typeid-js';

export function generateMember(): FlattenMaps<Member> {
    return {
        _id: typeid('mbr').toString(),
        created_at: faker.date.past(),
        updated_at: faker.date.past(),
        display_name: faker.person.fullName(),
        email: faker.internet.email(),
        password_hash: faker.string.alphanumeric(),
        role: 'MEMBER',
        timezone: faker.date.timeZone(),
        verifyPassword: fn(),
    };
}

export const DefaultMember = generateMember();
