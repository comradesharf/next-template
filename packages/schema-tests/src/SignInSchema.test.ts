import { SignInSchema } from '@comradesharf/schemas/SignInSchema';
import { expect, test } from 'vitest';

test('should validate SignInSchema', () => {
    expect(SignInSchema.parse({})).toEqual({});
});
