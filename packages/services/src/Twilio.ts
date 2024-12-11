import twilio from "twilio";

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
);

const verifyService = client.verify.v2.services(
    process.env.TWILIO_VERIFY_SERVICE_SID!,
);

async function lookupPhoneNumber(phoneNumber: string) {
    return client.lookups.v2.phoneNumbers(phoneNumber).fetch({});
}

async function createSmsVerification(phoneNumber: string) {
    return verifyService.verifications.create({
        channel: "sms",
        to: phoneNumber,
    });
}

async function checkVerificationCode(
    phoneNumber: string,
    verificationCode: string,
) {
    return verifyService.verificationChecks.create({
        to: phoneNumber,
        code: verificationCode,
    });
}

export default {
    lookupPhoneNumber,
    createSmsVerification,
    checkVerificationCode,
};
