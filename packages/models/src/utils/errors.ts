export enum InvalidArgumentReasonEnum {}

export enum FailedPreconditionReasonEnum {}

export type ErrorPayload =
    | {
          code: "INVALID_OTP";
      }
    | {
          code: "INVALID_CREDENTIALS";
      }
    | {
          code: "NOT_FOUND";
          data: {
              type: string;
          };
      }
    | {
          code: "UNKNOWN";
      }
    | {
          code: "UNAUTHORIZED";
      }
    | {
          code: "NOT_IMPLEMENTED";
      }
    | {
          code: "INTERNAL";
          actual: string;
          expected: string;
      }
    | {
          /**
           * The client specified an invalid argument. Note that this differs from FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are problematic regardless of the state of the system (e.g., a malformed file name).
           */
          code: "INVALID_ARGUMENT";
          field?: string;
          reason: InvalidArgumentReasonEnum;
      }
    | {
          /**
           * The operation was rejected because the system is not in a state required for the operation’s execution. For example, the directory to be deleted is non-empty, an rmdir operation is applied to a non-directory, etc.
           */
          code: "FAILED_PRECONDITION";
          reason: FailedPreconditionReasonEnum;
      };

export class ServerError extends Error {
    constructor(
        public readonly payload: ErrorPayload,
        public readonly cause?: unknown,
    ) {
        super();
        this.cause = cause;
        this.payload = payload;
        this.message = JSON.stringify(payload);
        Object.setPrototypeOf(this, ServerError.prototype);
    }

    toJSON() {
        return this.payload;
    }
}
