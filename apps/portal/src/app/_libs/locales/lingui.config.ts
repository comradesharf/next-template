import type { LinguiConfig } from '@lingui/conf';
import { SupportedLocales } from '#app/_libs/locales/SupportedLocales.ts';

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
