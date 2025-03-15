import memoize from "lodash-es/memoize";
import stableHash from "stable-hash";

export const initNumberFormatter: (
    locale: string,
    options?: Intl.NumberFormatOptions,
) => Intl.NumberFormat = memoize(
    (locale, options?) => new Intl.NumberFormat(locale, options),
    (locale, options = {}) => stableHash([locale, options]),
);

export type FormatVariant = {
    "compact-minute": unknown;
    "compact-hour": unknown;
    "compact-millisecond": unknown;
    currency: unknown;
};

export interface NumberI18nConfig {
    formatVariant?: Record<keyof FormatVariant, Intl.NumberFormatOptions>;
}

export const NumberFormatVariant = {
    "compact-minute": {
        style: "unit",
        unit: "minute",
        unitDisplay: "narrow",
        notation: "compact",
    },
    "compact-hour": {
        style: "unit",
        unit: "hour",
        unitDisplay: "narrow",
        notation: "compact",
    },
    "compact-millisecond": {
        style: "unit",
        unit: "millisecond",
        unitDisplay: "narrow",
        notation: "compact",
    },
    currency: {
        style: "currency",
        currencyDisplay: "narrowSymbol",
    },
} satisfies NumberI18nConfig["formatVariant"];
