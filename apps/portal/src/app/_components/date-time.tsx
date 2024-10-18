'use client';

import { useLingui } from '@lingui/react';
import { useSession } from 'next-auth/react';
import {
    type PropsWithChildren,
    createContext,
    useContext,
    useMemo,
} from 'react';
import type { DateTimeFormatterProps } from '#app/_components/date-time.shared.tsx';
import {
    type DateTimeI18nConfig,
    type FormatVariant,
    initDateFormatter,
} from '#app/_libs/locales/date-times.config.ts';

const Context = createContext<DateTimeI18nConfig>({});

export function DateTimeI18nContext({
    children,
    defaultFormatVariant,
    formatVariant = {},
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

    return (
        <Context.Provider
            value={{
                defaultFormatVariant,
                formatVariant: $formatVariant,
            }}
        >
            {children}
        </Context.Provider>
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

export function useLocaleDateTimeFormatter({
    variant,
    options,
}: Pick<DateTimeFormatterProps, 'variant' | 'options'> = {}) {
    const { i18n } = useLingui();

    const { formatVariant: mapping = {}, defaultFormatVariant } =
        useContext(Context);

    const $variant = (variant ?? defaultFormatVariant) as keyof FormatVariant;

    const config = {
        ...($variant ? mapping?.[$variant] : {}),
        ...options,
    };

    return initDateFormatter(i18n.locale, config);
}
