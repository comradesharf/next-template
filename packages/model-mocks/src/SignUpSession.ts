import { generateIdWithPrefix } from '@comradesharf/models/models/Base';
import type { SignUpSession } from '@comradesharf/models/models/SignUpSession';
import { faker } from '@faker-js/faker';
import type { FlattenMaps } from 'mongoose';

export function generateSignUpSession(): FlattenMaps<SignUpSession> {
    return {
        _id: generateIdWithPrefix('sus')(),
        created_at: faker.date.past(),
        updated_at: faker.date.past(),
        password_hash: faker.internet.password(),
        email: faker.internet.email(),
        display_name: faker.person.fullName(),
        otp: faker.string.hexadecimal({
            casing: 'lower',
            length: 5,
            prefix: '',
        }),
        role: faker.helpers.arrayElement(['MEMBER', 'ADMIN']),
    };
}

export const DefaultSignUpSession = generateSignUpSession();
