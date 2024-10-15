import { msg } from '@lingui/macro';

type UnknownError = {
    code: 'UNKNOWN';
};

type NotFound = {
    code: 'NOT_FOUND';
    data: {
        type: string;
    };
};

type InvalidCredentials = {
    code: 'INVALID_CREDENTIALS';
};

type DuplicateEmail = {
    code: 'DUPLICATE_EMAIL';
};

export type ErrorPayload =
    | UnknownError
    | NotFound
    | InvalidCredentials
    | DuplicateEmail;

export class ServerActionError extends Error {
    constructor(
        public payload: ErrorPayload,
        public cause?: unknown,
    ) {
        super();
        this.cause = cause;
        this.payload = payload;
        Object.setPrototypeOf(this, ServerActionError.prototype);
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
            default:
                return msg`Something went wrong while executing the operation.`;
        }
    }
}
