import type { ErrorPayload } from '@comradesharf/models/utils/errors';
import { msg } from '@lingui/macro';

export class I18nServerActionError extends Error {
    public payload: ErrorPayload;
    constructor(payload: ErrorPayload, cause?: unknown) {
        super();
        this.payload = payload;
        this.cause = cause;
        Object.setPrototypeOf(this, I18nServerActionError.prototype);
    }

    toJSON() {
        return this.payload;
    }

    static getDefinedI18nMessage(payload: ErrorPayload) {
        switch (payload.code) {
            case 'NOT_FOUND':
                return msg`Unable to find matching ${payload.data.type}. Please check the URL or contact support if the problem persists.`;
            case 'INVALID_CREDENTIALS':
                return msg`The username or password you entered is incorrect. Please try again.`;
            case 'DUPLICATE_EMAIL':
                return msg`The email address you entered is already in use. Please use a different email address.`;
            case 'INVALID_OTP':
                return msg`The OTP you entered is incorrect. Please try again.`;
            default:
                return msg`Something went wrong while executing the operation.`;
        }
    }
}
