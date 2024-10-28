import { DefaultMember } from '@comradesharf/model-mocks/Member';
import { SignInSchema } from '@comradesharf/schemas/SignInSchema';
import { faker } from '@faker-js/faker';
import { expect, test } from 'vitest';

test('should validate SignInSchema', () => {
    const password = faker.string.alphanumeric({ length: 10 });

    expect(
        SignInSchema.parse({
            email: DefaultMember.email,
            password,
        }),
    ).toEqual({
        email: DefaultMember.email,
        password,
    });
});
