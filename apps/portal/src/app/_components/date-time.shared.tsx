import type { HTMLAttributes } from 'react';
import type { FormatVariant } from '#app/_libs/locales/date-times.config.ts';

export interface DateTimeFormatterProps
    extends Omit<HTMLAttributes<HTMLTimeElement>, 'datetime'> {
    className?: string;
    date: Date;
    variant?: keyof FormatVariant;
    options?: Intl.DateTimeFormatOptions;
    formatFromParts?: (parts: Intl.DateTimeFormatPart[]) => string;
}
