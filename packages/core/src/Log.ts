import pino from 'pino';

export const Log = pino({
    browser: {
        asObject: true,
    },
    enabled: process.env.NODE_ENV !== 'test',
    level: process.env.LOG_LEVEL,
    redact: {
        paths: ['*.email', '*.phone'],
        censor: '**REDACT**',
    },
});
