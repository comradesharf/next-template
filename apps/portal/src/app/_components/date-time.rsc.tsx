import "server-only";
import { getI18n } from "@lingui/react/server";
import type {
    DateTimeFormatterProps,
    DateTimeRangeFormatterProps,
} from "#app/_components/date-time.shared.tsx";
import {
    DateTimeFormatVariant,
    type DateTimeI18nConfig,
    DefaultDateTimeFormatVariant,
    type FormatVariant,
    initDateFormatter,
} from "#app/_libs/locales/date-times.config.ts";

import type { PropsWithChildren } from "react";

export function DateTimeI18nContext({
    children,
}: PropsWithChildren<DateTimeI18nConfig>) {
    return children;
}

export function DateTimeFormatter({
    date,
    variant,
    options = {},
    className,
    formatFromParts,
    ...props
}: DateTimeFormatterProps) {
    const ctx = getI18n();
    if (!ctx) {
        throw new Error(
            "You tried to use `DateTimeFormatter` in Server Component, but i18n instance for RSC hasn't been setup.\nMake sure to call `setI18n` in the root of your page.",
        );
    }

    const $variant = (variant ??
        DefaultDateTimeFormatVariant) as keyof FormatVariant;

    const config = {
        // @ts-ignore
        ...($variant ? DateTimeFormatVariant?.[$variant] : {}),
        ...options,
    };

    const formatter = initDateFormatter(ctx.i18n.locale, config);

    let result: string;
    if (formatFromParts) {
        result = formatFromParts(formatter.formatToParts(date));
    } else {
        result = formatter.format(date);
    }

    return (
        <time {...props} className={className} dateTime={result}>
            {result}
        </time>
    );
}

export function DateTimeRangeFormatter({
    variant,
    options = {},
    className,
    formatFromParts,
    range: [start, end],
    ...props
}: DateTimeRangeFormatterProps) {
    const ctx = getI18n();
    if (!ctx) {
        throw new Error(
            "You tried to use `DateTimeFormatter` in Server Component, but i18n instance for RSC hasn't been setup.\nMake sure to call `setI18n` in the root of your page.",
        );
    }

    const $variant = (variant ??
        DefaultDateTimeFormatVariant) as keyof FormatVariant;

    const config = {
        // @ts-ignore
        ...($variant ? DateTimeFormatVariant?.[$variant] : {}),
        ...options,
    };

    const formatter = initDateFormatter(ctx.i18n.locale, config);

    let result: string;
    if (formatFromParts) {
        result = formatFromParts(formatter.formatRangeToParts(start, end));
    } else {
        result = formatter.formatRange(start, end);
    }

    return (
        <span {...props} className={className}>
            {result}
        </span>
    );
}
