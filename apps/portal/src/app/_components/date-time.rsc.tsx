import 'server-only';
import { getI18n } from '@lingui/react/server';
import type { DateTimeFormatterProps } from '#app/_components/date-time.shared.tsx';
import {
    DateTimeFormatVariant,
    type DateTimeI18nConfig,
    DefaultDateTimeFormatVariant,
    type FormatVariant,
    initDateFormatter,
} from '#app/_libs/locales/date-times.config.ts';

import type { PropsWithChildren } from 'react';

export function DateTimeI18nContext(_: PropsWithChildren<DateTimeI18nConfig>) {
    throw new Error('This component should not be used in server component');
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
