import { fn } from "@vitest/spy";
import Twilio from "./Twilio.ts";

/**
 * We mock this function to avoid making actual requests to Twilio. Twilio test credential does not support this yet.
 *
 * @link https://www.twilio.com/en-us/blog/test-verify-no-rate-limits
 */
const createSmsVerification = fn().mockName("createSmsVerification");

const checkVerificationCode = fn().mockName("checkVerificationCode");

export default {
    lookupPhoneNumber: Twilio.lookupPhoneNumber,
    createSmsVerification,
    checkVerificationCode,
};
