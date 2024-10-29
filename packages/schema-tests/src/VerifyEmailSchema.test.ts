import { DefaultSignUpSession } from '@comradesharf/model-mocks/SignUpSession';
import { VerifyEmailSchema } from '@comradesharf/schemas/VerifyEmailSchema';
import { expect, test } from 'vitest';

test('should validate VerifyEmailSchema', () => {
    expect(
        VerifyEmailSchema.parse({
            otp: DefaultSignUpSession.otp,
        }),
    ).toEqual({
        otp: DefaultSignUpSession.otp,
    });
});
