import { DefaultMember } from '@comradesharf/model-mocks/Member';
import { SignUpSchema } from '@comradesharf/schemas/SignUpSchema';
import { faker } from '@faker-js/faker';
import { expect, test } from 'vitest';

test('should validate SignUpSchema', () => {
    const password = faker.string.alphanumeric({ length: 10 });

    expect(
        SignUpSchema.parse({
            email: DefaultMember.email,
            display_name: DefaultMember.display_name,
            password,
            confirm_password: password,
        }),
    ).toEqual({
        email: DefaultMember.email,
        display_name: DefaultMember.display_name,
        password,
        confirm_password: password,
    });
});
