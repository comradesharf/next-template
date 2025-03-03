import type { FormatVariant } from "app-core/date-times.config";
import type { HTMLAttributes } from "react";

export interface DateTimeFormatterProps
    extends Omit<HTMLAttributes<HTMLTimeElement>, "datetime"> {
    className?: string;
    date: Date | number;
    variant?: keyof FormatVariant;
    options?: Intl.DateTimeFormatOptions;
    formatFromParts?: (parts: Intl.DateTimeFormatPart[]) => string;
}

export interface DateTimeRangeFormatterProps
    extends Omit<HTMLAttributes<HTMLTimeElement>, "datetime"> {
    className?: string;
    range: readonly [startDate: Date | number, endDate: Date | number];
    variant?: keyof FormatVariant;
    options?: Intl.DateTimeFormatOptions;
    formatFromParts?: (parts: Intl.DateTimeRangeFormatPart[]) => string;
}
