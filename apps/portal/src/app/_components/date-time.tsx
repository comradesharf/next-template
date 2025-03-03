"use client";

import { useLingui } from "@lingui/react/macro";
import * as Locales from "app-core/Locales";
import {
    DateTimeFormatVariant,
    type DateTimeI18nConfig,
    DefaultDateTimeFormatVariant,
    type FormatVariant,
    initDateFormatter,
} from "app-core/date-times.config";
import type { Locale } from "date-fns";
import { useSession } from "next-auth/react";
import {
    type PropsWithChildren,
    createContext,
    use,
    useEffect,
    useMemo,
    useState,
} from "react";
import type {
    DateTimeFormatterProps,
    DateTimeRangeFormatterProps,
} from "#app/_components/date-time.shared.tsx";

const Context = createContext<DateTimeI18nConfig>({});

export function DateTimeI18nContext({
    children,
    defaultFormatVariant = DefaultDateTimeFormatVariant,
    formatVariant = DateTimeFormatVariant,
}: PropsWithChildren<DateTimeI18nConfig>) {
    const $timezone = useSession().data?.user.timezone;

    const $formatVariant = useMemo(() => {
        const timeZone = $timezone ?? process.env.NEXT_PUBLIC_DEFAULT_USER_TZ;

        return Object.fromEntries(
            Object.entries(formatVariant).map(([key, value]) => [
                key,
                {
                    ...value,
                    timeZone,
                },
            ]),
        );
    }, [formatVariant, $timezone]);

    const [dfLocaleMapping, setDfLocaleMapping] = useState<
        Record<string, Locale>
    >({});

    useEffect(() => {
        import("date-fns/locale").then((module) => setDfLocaleMapping(module));
    }, []);

    const { i18n } = useLingui();

    const $locale =
        Locales.normalizeLocale(i18n.locale).find(
            ($locale) => $locale in dfLocaleMapping,
        ) ?? "enUS";

    return (
        <Context
            value={{
                defaultFormatVariant,
                // @ts-expect-error
                formatVariant: $formatVariant,
                dfLocale: dfLocaleMapping[$locale],
            }}
        >
            {children}
        </Context>
    );
}

export function DateTimeFormatter({
    date,
    variant,
    options = {},
    className,
    formatFromParts,
    ...props
}: DateTimeFormatterProps) {
    const formatter = useLocaleDateTimeFormatter({
        variant,
        options,
    });

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
    const formatter = useLocaleDateTimeFormatter({
        variant,
        options,
    });

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

export function useLocaleDateTimeFormatter({
    variant,
    options,
}: Pick<DateTimeFormatterProps, "variant" | "options"> = {}) {
    const { i18n } = useLingui();

    const { formatVariant: mapping = {}, defaultFormatVariant } = use(Context);

    const $variant = (variant ?? defaultFormatVariant) as keyof FormatVariant;

    const config = {
        // @ts-expect-error
        ...($variant ? mapping?.[$variant] : {}),
        ...options,
    };

    return initDateFormatter(i18n.locale, config);
}

export function useDateFnsLocale() {
    return use(Context).dfLocale;
}
