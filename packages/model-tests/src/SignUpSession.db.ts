import * as Emails from '@comradesharf/emails/Emails';
import { DefaultSignUpSession } from '@comradesharf/model-mocks/SignUpSession';
import { SignUpSessionModel } from '@comradesharf/models/models/SignUpSessionModel';
import { faker } from '@faker-js/faker';
import { connection } from 'mongoose';
import { expect, test, vi } from 'vitest';

test('should be able to create', async () => {
    await connection.transaction(async (session) => {
        const [sus] = await SignUpSessionModel.create([DefaultSignUpSession], {
            session,
        });
        await expect(
            SignUpSessionModel.findById(sus._id)
                .session(session)
                .lean()
                .orFail(),
        ).resolves.not.toThrow();
    });
});

test('should be able to hash password', async () => {
    const password = faker.internet.password();
    await expect(
        SignUpSessionModel.saltAndHashPassword(password),
    ).resolves.toMatch(/^[a-f0-9]{32}:[a-f0-9]{128}$/);
});

test('should be able to generate OTP', () => {
    expect(SignUpSessionModel.generateOTP()).toMatch(/^[a-f0-9]{5}$/);
});

test('should be able to sign up', async () => {
    await connection.transaction(async (session) => {
        const password = faker.internet.password();

        const $sendMail = vi.spyOn(Emails, 'sendMail');

        await expect(
            SignUpSessionModel.signUp(
                {
                    password,
                    display_name: DefaultSignUpSession.display_name,
                    email: DefaultSignUpSession.email,
                    confirm_password: password,
                    role: 'MEMBER',
                    lang: 'en',
                },
                {
                    session,
                },
            ),
        ).resolves.toMatchObject({
            role: 'MEMBER',
            email: DefaultSignUpSession.email.toLowerCase(),
            otp: expect.stringMatching(/^[a-f0-9]{5}$/),
        });

        expect($sendMail).toHaveBeenCalledWith(
            expect.objectContaining({
                to: DefaultSignUpSession.email.toLowerCase(),
            }),
        );
    });
});
