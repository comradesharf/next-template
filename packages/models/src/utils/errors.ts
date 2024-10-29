export type ErrorPayload =
    | {
          code: 'DUPLICATE_EMAIL';
      }
    | {
          code: 'INVALID_OTP';
      }
    | {
          code: 'INVALID_CREDENTIALS';
      }
    | {
          code: 'NOT_FOUND';
          data: {
              type: string;
          };
      }
    | {
          code: 'UNKNOWN';
      }
    | {
          code: 'UNAUTHORIZED';
      };

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
}
