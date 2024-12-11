import { MemberIdSchema } from 'app-schemas/MemberIdSchema';
import { expect, test } from 'vitest';
import { faker } from '@faker-js/faker';

test('should validate MemberIdSchema', () => {
    const id = faker.string.alphanumeric({ casing: 'lower', length: 24 });
    expect(MemberIdSchema.parse(`mbr_${id}`)).toEqual(`mbr_${id}`);
});
