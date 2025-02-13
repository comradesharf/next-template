import {
    DateTimeFormatVariant,
    DefaultDateTimeFormatVariant,
    type FormatVariant,
    initDateFormatter,
} from "app-core/date-times.config";
import { useLingui } from "app-i18n/lingui";

export interface DateTimeFormatterProps {
    date: Date | number;
    variant?: keyof FormatVariant;
    options?: Intl.DateTimeFormatOptions;
    formatFromParts?: (parts: Intl.DateTimeFormatPart[]) => string;
}

export function DateTimeFormatter({
    date,
    variant,
    options = {},
    formatFromParts,
}: DateTimeFormatterProps) {
    const { i18n } = useLingui();

    const $variant = (variant ??
        DefaultDateTimeFormatVariant) as keyof FormatVariant;

    const config = {
        ...($variant ? DateTimeFormatVariant?.[$variant] : {}),
        ...options,
    };

    const formatter = initDateFormatter(i18n.locale, config);

    let result: string;
    if (formatFromParts) {
        result = formatFromParts(formatter.formatToParts(date));
    } else {
        result = formatter.format(date);
    }
    return result;
}
