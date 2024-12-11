import { accessibleBy } from "@casl/mongoose";
import {
    type ReturnModelType,
    index,
    modelOptions,
    prop,
} from "@typegoose/typegoose";
import { Log } from "app-core/Log";
import type { PhoneNumberVerificationId } from "app-schemas/PhoneNumberVerificationIdSchema";
import Twilio from "app-services/Twilio";
import { addMinutes, isFuture } from "date-fns";
import type { FlattenMaps } from "mongoose";
import { Base } from "#models/Base.ts";
import { PhoneNumber } from "#models/PhoneNumber.ts";
import type { Abilities, Actions } from "#utils/abilities.ts";
import { getAbilities } from "#utils/abilitiesContext.ts";
import { ServerError } from "#utils/errors.ts";
import { generateIdWithPrefix } from "#utils/generateId.ts";

declare module "@casl/ability" {
    interface RecordTypes {
        PhoneNumberVerification: PhoneNumberVerification;
    }
}

const log = Log.child({
    Model: "PhoneNumberVerification",
});

@modelOptions({
    options: {
        customName: "PhoneNumberVerification",
    },
})
@index({ "phoneNumber.phone": 1 }, { unique: true })
class PhoneNumberVerification extends Base {
    @prop({
        required: true,
        type: String,
        default: generateIdWithPrefix("pnv"),
    })
    _id!: PhoneNumberVerificationId;

    @prop({
        type: String,
    })
    countryCode?: string;

    @prop({
        type: String,
    })
    nationalFormat?: string;

    @prop({
        required: true,
        type: () => PhoneNumber,
    })
    phoneNumber!: PhoneNumber;

    @prop({
        type: String,
    })
    callingCountryCode?: string;

    @prop({
        type: Boolean,
        default: false,
    })
    verified!: boolean;

    @prop({
        type: Boolean,
        default: false,
    })
    valid!: boolean;

    @prop({
        type: Date,
    })
    expiredAt?: Date;

    @prop({
        type: Number,
        default: 0,
    })
    retryCount!: number;

    static async checkVerificationCode(
        this: ReturnModelType<typeof PhoneNumberVerification>,
        {
            _id,
            verificationCode,
        }: {
            _id: PhoneNumberVerificationId;
            verificationCode: string;
        },
    ) {
        const $log = log.child({
            _id,
            method: "verifyVerificationCode",
        });

        $log.debug({ state: "start" });

        const doc = await this.oneAccessibleBy("read")
            .where("_id")
            .equals(_id)
            .orFail();

        if (!doc.valid) {
            $log.debug({ state: "invalid_number" });
            return doc;
        }

        if (doc.verified) {
            $log.debug({ state: "already_verified" });
            return doc;
        }

        const response = await Twilio.checkVerificationCode(
            doc.phoneNumber.phone,
            verificationCode,
        );

        if (response.status !== "approved") {
            throw new ServerError({
                code: "INVALID_OTP",
            });
        }

        doc.verified = true;
        doc.valid = true;
        doc.expiredAt = undefined;

        $log.debug({ state: "verified" });

        return await doc.save();
    }

    static async createSmsVerification(
        this: ReturnModelType<typeof PhoneNumberVerification>,
        phoneNumber: FlattenMaps<PhoneNumber>,
    ) {
        const $log = log.child({
            phoneNumber,
            method: "createSmsVerification",
        });

        $log.debug({ state: "start" });
        let doc = await this.oneAccessibleBy("read")
            .where("phoneNumber.phone")
            .equals(phoneNumber.phone);

        if (!doc) {
            $log.debug({ state: "new_number" });
            const response = await Twilio.lookupPhoneNumber(phoneNumber.phone);
            doc = new this({
                countryCode: response.countryCode,
                nationalFormat: response.nationalFormat,
                callingCountryCode: response.callingCountryCode,
                phoneNumber: phoneNumber,
                valid: response.valid,
            });
            await doc.save();
        }

        if (!doc.valid) {
            $log.debug({ state: "invalid_number" });
            return doc;
        }

        if (doc.verified) {
            $log.debug({ state: "already_verified" });
            return doc;
        }

        if (!!doc.expiredAt && isFuture(doc.expiredAt)) {
            $log.debug({ state: "not_expired" });
            return doc;
        }

        try {
            await Twilio.createSmsVerification(phoneNumber.phone);
            /**
             * added exponential backoff for retrying verification
             */
            doc.retryCount += 1;
            doc.expiredAt = addMinutes(new Date(), 1 * doc.retryCount);
            $log.debug({ state: "verification_sent" });
            return await doc.save();
        } catch (e) {
            if (
                e instanceof Error &&
                e.message.match(/Phone number is already verified/i)
            ) {
                $log.debug({ state: "already_twilio_verified" });
                doc.valid = true;
                doc.verified = true;
                doc.expiredAt = undefined;
                return await doc.save();
            }
            throw e;
        }
    }

    static accessibleBy(
        this: ReturnModelType<typeof PhoneNumberVerification>,
        action: Actions,
        abilities: Abilities | null | undefined = getAbilities(),
    ) {
        if (!abilities) {
            return this.find();
        }

        return this.find(
            accessibleBy(abilities, action).ofType("PhoneNumberVerification"),
        );
    }

    static oneAccessibleBy(
        this: ReturnModelType<typeof PhoneNumberVerification>,
        action: Actions,
        abilities: Abilities | null | undefined = getAbilities(),
    ) {
        if (!abilities) {
            return this.findOne();
        }

        return this.findOne(
            accessibleBy(abilities, action).ofType("PhoneNumberVerification"),
        );
    }
}

export { PhoneNumberVerification };
