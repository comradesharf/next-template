import type { Locale } from "date-fns";
import memoize from "lodash-es/memoize";
import stableHash from "stable-hash";

export const initDateFormatter: (
    locale: string,
    options?: Intl.DateTimeFormatOptions,
) => Intl.DateTimeFormat = memoize(
    (locale, options?) => new Intl.DateTimeFormat(locale, options),
    (locale, options = {}) => stableHash([locale, options]),
);

export interface FormatVariant {
    "short-date": never;
    "medium-date": never;
    weekday: never;
    date: never;
    year: never;
}

export interface DateTimeI18nConfig {
    formatVariant?: Record<keyof FormatVariant, Intl.DateTimeFormatOptions>;
    defaultFormatVariant?: keyof FormatVariant;
    dfLocale?: Locale;
}

export const DateTimeFormatVariant = {
    "short-date": {
        dateStyle: "short",
    },
    "medium-date": {
        dateStyle: "medium",
    },
    weekday: {
        weekday: "short",
    },
    year: {
        year: "numeric",
    },
    date: {
        day: "numeric",
        month: "long",
        year: "numeric",
    },
} satisfies DateTimeI18nConfig["formatVariant"];

export const DefaultDateTimeFormatVariant = "short-date" as keyof FormatVariant;
