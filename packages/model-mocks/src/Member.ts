import { generateIdWithPrefix } from '@comradesharf/models/models/Base';
import type { Member } from '@comradesharf/models/models/Member';
import { faker } from '@faker-js/faker';
import type { FlattenMaps } from 'mongoose';

export function generateMember(): FlattenMaps<Member> {
    return {
        _id: generateIdWithPrefix('mbr')(),
        created_at: faker.date.past(),
        updated_at: faker.date.past(),
    };
}

export const DefaultMember = generateMember();
