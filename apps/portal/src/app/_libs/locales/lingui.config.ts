import { SupportedLocales } from '@comradesharf/core/SupportedLocales';
import type { LinguiConfig } from '@lingui/conf';

export default {
    locales: SupportedLocales.map(({ value }) => value),
    sourceLocale: 'en',
    catalogs: [
        {
            path: '<rootDir>/messages/{locale}',
            include: ['src'],
        },
    ],
    format: 'po',
} as LinguiConfig;
