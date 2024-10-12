import { SignUpSchema } from '@comradesharf/schemas/SignUpSchema';
import { expect, test } from 'vitest';

test('should validate SignUpSchema', () => {
    expect(SignUpSchema.parse({})).toEqual({});
});
