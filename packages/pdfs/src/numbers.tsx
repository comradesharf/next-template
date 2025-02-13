import {
    type FormatVariant,
    NumberFormatVariant,
    initNumberFormatter,
} from "app-core/numbers.config";
import { useLingui } from "app-i18n/lingui";
import type { ReactNode } from "react";

type StringNumericLiteral =
    | `${number}`
    | "Infinity"
    | "-Infinity"
    | "+Infinity";

export interface NumberFormatterProps {
    number: number | bigint | StringNumericLiteral;
    variant?: keyof FormatVariant;
    options?: Intl.NumberFormatOptions;
    formatFromParts?: (parts: Intl.NumberFormatPart[]) => ReactNode;
}

export function NumberFormatter({
    variant,
    options = {},
    formatFromParts,
    number,
}: NumberFormatterProps) {
    const { i18n } = useLingui();

    const config = {
        ...(variant ? NumberFormatVariant?.[variant] : {}),
        ...options,
    };

    const formatter = initNumberFormatter(i18n.locale, config);

    let result: ReactNode;
    if (formatFromParts) {
        result = formatFromParts(formatter.formatToParts(Number(number)));
    } else {
        result = formatter.format(Number(number));
    }
    return result;
}
