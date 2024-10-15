import type { HTMLAttributes } from 'react';
import type { FormatVariant } from '#app/_libs/locales/date-times.config.ts';

export interface DateTimeFormatterProps
    extends Omit<HTMLAttributes<HTMLTimeElement>, 'datetime'> {
    className?: string;
    date: Date | number;
    variant?: keyof FormatVariant;
    options?: Intl.DateTimeFormatOptions;
    formatFromParts?: (parts: Intl.DateTimeFormatPart[]) => string;
}

export interface DateTimeRangeFormatterProps
    extends Omit<HTMLAttributes<HTMLTimeElement>, 'datetime'> {
    className?: string;
    range: readonly [startDate: Date | number, endDate: Date | number];
    variant?: keyof FormatVariant;
    options?: Intl.DateTimeFormatOptions;
    formatFromParts?: (parts: Intl.DateTimeRangeFormatPart[]) => string;
}
