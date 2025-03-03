export enum StatusCode {
    PARSE_ERROR = "PARSE_ERROR",
    BAD_REQUEST = "BAD_REQUEST",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
    BAD_GATEWAY = "BAD_GATEWAY",
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
    GATEWAY_TIMEOUT = "GATEWAY_TIMEOUT",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    NOT_FOUND = "NOT_FOUND",
    METHOD_NOT_SUPPORTED = "METHOD_NOT_SUPPORTED",
    TIMEOUT = "TIMEOUT",
    CONFLICT = "CONFLICT",
    PRECONDITION_FAILED = "PRECONDITION_FAILED",
    PAYLOAD_TOO_LARGE = "PAYLOAD_TOO_LARGE",
    UNSUPPORTED_MEDIA_TYPE = "UNSUPPORTED_MEDIA_TYPE",
    UNPROCESSABLE_CONTENT = "UNPROCESSABLE_CONTENT",
    TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
    CLIENT_CLOSED_REQUEST = "CLIENT_CLOSED_REQUEST",
}

export class ServerError extends Error {
    constructor(
        message: string,
        public code: StatusCode,
        cause?: unknown,
    ) {
        super(message);
        this.cause = cause;
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}

export class NotFoundError extends ServerError {
    constructor(message: string, cause?: unknown) {
        super(message, StatusCode.NOT_FOUND, cause);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class UnauthorizedError extends ServerError {
    constructor(message: string, cause?: unknown) {
        super(message, StatusCode.UNAUTHORIZED, cause);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export class BadRequestError extends ServerError {
    constructor(
        message: string,
        public field: string,
        cause?: unknown,
    ) {
        super(message, StatusCode.BAD_REQUEST, cause);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export class InternalServerError extends ServerError {
    constructor(message: string, cause?: unknown) {
        super(message, StatusCode.INTERNAL_SERVER_ERROR, cause);
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}

export class PreconditionFailedError extends ServerError {
    constructor(message: string, cause?: unknown) {
        super(message, StatusCode.PRECONDITION_FAILED, cause);
        Object.setPrototypeOf(this, PreconditionFailedError.prototype);
    }
}

export class NotImplementedError extends ServerError {
    constructor(message: string, cause?: unknown) {
        super(message, StatusCode.NOT_IMPLEMENTED, cause);
        Object.setPrototypeOf(this, NotImplementedError.prototype);
    }
}

export class ConflictError extends ServerError {
    constructor(message: string, cause?: unknown) {
        super(message, StatusCode.CONFLICT, cause);
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
