"use client";

import "client-only";
import { useLingui } from "@lingui/react/macro";
import {
    NumberFormatVariant,
    type NumberI18nConfig,
    initNumberFormatter,
} from "app-core/numbers.config";
import {
    type PropsWithChildren,
    type ReactNode,
    createContext,
    use,
} from "react";
import type {
    NumberFormatterProps,
    NumberRangeFormatterProps,
} from "#app/_components/number.shared.tsx";

const Context = createContext<NumberI18nConfig>({
    formatVariant: NumberFormatVariant,
});

export function NumberI18Context({
    children,
    formatVariant = NumberFormatVariant,
}: PropsWithChildren<NumberI18nConfig>) {
    return <Context value={{ formatVariant }}>{children}</Context>;
}

export function NumberFormatter({
    variant,
    options = {},
    className,
    formatFromParts,
    number,
    ...props
}: NumberFormatterProps) {
    const formatter = useLocaleNumberFormatter({
        variant,
        options,
    });

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
    const formatter = useLocaleNumberFormatter({
        variant,
        options,
    });

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

export function useLocaleNumberFormatter({
    variant,
    options,
}: Pick<NumberFormatterProps, "variant" | "options"> = {}) {
    const { i18n } = useLingui();

    const { formatVariant: mapping = {} } = use(Context);

    const config = {
        // @ts-expect-error
        ...(variant ? mapping?.[variant] : {}),
        ...options,
    };

    return initNumberFormatter(i18n.locale, config);
}
