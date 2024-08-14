import type { LinguiConfig } from '@lingui/conf';

export default {
    locales: ['en'],
    sourceLocale: 'en',
    catalogs: [
        {
            path: '<rootDir>/messages/{locale}',
            include: ['src'],
        },
    ],
    format: 'po',
} as LinguiConfig;
