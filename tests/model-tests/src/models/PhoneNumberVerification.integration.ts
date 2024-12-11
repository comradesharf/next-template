import { faker } from "@faker-js/faker";
import {
    InvalidPhoneNumber,
    TwilioPhoneNumber,
} from "app-model-mocks/PhoneNumber";
import { DefaultPhoneNumberVerification } from "app-model-mocks/PhoneNumberVerification";
import { PhoneNumberVerificationModel } from "app-models/models/PhoneNumberVerificationModel";
import { withAbilities } from "app-models/utils/abilitiesContext";
import Twilio from "app-services/Twilio";
import { connection } from "mongoose";
import { expect, test, vi } from "vitest";

test("should be able to create", async () => {
    await connection.transaction(async () => {
        const [pnv] = await PhoneNumberVerificationModel.create([
            DefaultPhoneNumberVerification,
        ]);
        await expect(
            PhoneNumberVerificationModel.findById(pnv._id).lean().orFail(),
        ).resolves.not.toThrow();
    });
});

test("should be able to verify phone number", async () => {
    await connection.transaction(async () => {
        await withAbilities(async () => {
            const $lookupPhoneNumber = vi.spyOn(Twilio, "lookupPhoneNumber");
            const $createSmsVerification = vi.spyOn(
                Twilio,
                "createSmsVerification",
            );
            const $checkVerificationCode = vi
                .spyOn(Twilio, "checkVerificationCode")
                .mockResolvedValueOnce({ status: "approved" } as any);

            await expect(
                PhoneNumberVerificationModel.createSmsVerification(
                    TwilioPhoneNumber,
                ),
            ).resolves.toBeTruthy();

            const saved = await PhoneNumberVerificationModel.findOne()
                .where("phoneNumber.phone")
                .equals(TwilioPhoneNumber.phone)
                .lean()
                .orFail();

            expect(saved).toMatchObject({
                phoneNumber: expect.objectContaining({
                    phone: TwilioPhoneNumber.phone,
                }),
                valid: true,
                verified: false,
                retryCount: 1,
                expiredAt: expect.any(Date),
            });

            expect($lookupPhoneNumber).toHaveBeenCalledTimes(1);
            expect($createSmsVerification).toHaveBeenCalledTimes(1);

            const verificationCode = faker.string.numeric({ length: 6 });

            await expect(
                PhoneNumberVerificationModel.checkVerificationCode({
                    _id: saved._id,
                    verificationCode,
                }),
            ).resolves.toBeTruthy();

            await expect(
                PhoneNumberVerificationModel.findOne()
                    .where("phoneNumber.phone")
                    .equals(TwilioPhoneNumber.phone)
                    .lean(),
            ).resolves.toMatchObject({
                phoneNumber: expect.objectContaining({
                    phone: TwilioPhoneNumber.phone,
                }),
                valid: true,
                verified: true,
            });

            expect($checkVerificationCode).toHaveBeenCalledTimes(1);
        });
    });
});

test("should update internal verified flag when Twilio already verified the number internally", async () => {
    await connection.transaction(async () => {
        await withAbilities(async () => {
            const $lookupPhoneNumber = vi.spyOn(Twilio, "lookupPhoneNumber");
            const $createSmsVerification = vi
                .spyOn(Twilio, "createSmsVerification")
                .mockRejectedValueOnce(
                    new Error(" Phone number is already verified."),
                );

            await expect(
                PhoneNumberVerificationModel.createSmsVerification(
                    TwilioPhoneNumber,
                ),
            ).resolves.toBeTruthy();

            await expect(
                PhoneNumberVerificationModel.findOne()
                    .where("phoneNumber.phone")
                    .equals(TwilioPhoneNumber.phone)
                    .lean(),
            ).resolves.toMatchObject({
                phoneNumber: expect.objectContaining({
                    phone: TwilioPhoneNumber.phone,
                }),
                valid: true,
                verified: true,
                retryCount: 0,
            });

            expect($lookupPhoneNumber).toHaveBeenCalledTimes(1);
            expect($createSmsVerification).toHaveBeenCalledTimes(1);
        });
    });
});

test("should save invalid phone number", async () => {
    await connection.transaction(async () => {
        await withAbilities(async () => {
            const $lookupPhoneNumber = vi
                .spyOn(Twilio, "lookupPhoneNumber")
                .mockResolvedValueOnce({ valid: false } as any);
            const $createSmsVerification = vi.spyOn(
                Twilio,
                "createSmsVerification",
            );

            await expect(
                PhoneNumberVerificationModel.createSmsVerification(
                    InvalidPhoneNumber,
                ),
            ).resolves.toBeTruthy();

            await expect(
                PhoneNumberVerificationModel.findOne()
                    .where("phoneNumber.phone")
                    .equals(InvalidPhoneNumber.phone)
                    .lean(),
            ).resolves.toMatchObject({
                phoneNumber: expect.objectContaining({
                    phone: InvalidPhoneNumber.phone,
                }),
                valid: false,
                verified: false,
                retryCount: 0,
            });

            expect($lookupPhoneNumber).toHaveBeenCalledTimes(1);
            expect($createSmsVerification).not.toHaveBeenCalled();
        });
    });
});
