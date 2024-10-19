import type { Locale } from 'date-fns';
import memoize from 'lodash-es/memoize';

export const initDateFormatter = memoize(
    (locale: string, options?: Intl.DateTimeFormatOptions) =>
        new Intl.DateTimeFormat(locale, options),
    (locale, options = {}) => {
        return [locale, ...Object.keys(options)]
            .toSorted()
            .flatMap((key) => [key, (options as any)[key]])
            .join('/');
    },
);

export interface FormatVariant {
    [variant: string]: Intl.DateTimeFormatOptions;
}

export interface DateTimeI18nConfig {
    formatVariant?: FormatVariant;
    defaultFormatVariant?: keyof FormatVariant;
    dfLocale?: Locale;
}

export const DateTimeFormatVariant = {
    'short-date': {
        dateStyle: 'short',
    },
    weekday: {
        weekday: 'short',
    },
    date: {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    },
} satisfies FormatVariant;

export const DefaultDateTimeFormatVariant = 'short-date' as keyof FormatVariant;
