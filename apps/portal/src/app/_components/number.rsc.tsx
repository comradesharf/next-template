import "server-only";
import { getI18n } from "@lingui/react/server";
import {
    NumberFormatVariant,
    type NumberI18nConfig,
    initNumberFormatter,
} from "app-core/numbers.config";
import type { PropsWithChildren, ReactNode } from "react";
import type {
    NumberFormatterProps,
    NumberRangeFormatterProps,
} from "#app/_components/number.shared.tsx";

export function NumberI18Context({
    children,
}: PropsWithChildren<NumberI18nConfig>) {
    return children;
}

export function NumberFormatter({
    variant,
    options = {},
    className,
    formatFromParts,
    number,
    ...props
}: NumberFormatterProps) {
    const ctx = getI18n();
    if (!ctx) {
        throw new Error(
            "You tried to use `NumberFormatter` in Server Component, but i18n instance for RSC hasn't been setup.\nMake sure to call `setI18n` in the root of your page.",
        );
    }

    const config = {
        ...(variant ? NumberFormatVariant?.[variant] : {}),
        ...options,
    };

    const formatter = initNumberFormatter(ctx.i18n.locale, config);

    let result: ReactNode;
    if (formatFromParts) {
        result = formatFromParts(formatter.formatToParts(Number(number)));
    } else {
        result = formatter.format(Number(number));
    }

    return (
        <span {...props} className={className}>
            {result}
        </span>
    );
}

export function NumberRangeFormatter({
    variant,
    options = {},
    className,
    formatFromParts,
    range: [start, end],
    ...props
}: NumberRangeFormatterProps) {
    const ctx = getI18n();
    if (!ctx) {
        throw new Error(
            "You tried to use `NumberFormatter` in Server Component, but i18n instance for RSC hasn't been setup.\nMake sure to call `setI18n` in the root of your page.",
        );
    }

    const config = {
        ...(variant ? NumberFormatVariant?.[variant] : {}),
        ...options,
    };

    const formatter = initNumberFormatter(ctx.i18n.locale, config);

    let result: ReactNode;
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
