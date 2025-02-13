import type { FormatVariant } from "app-core/numbers.config";
import type { HTMLAttributes, ReactNode } from "react";

type StringNumericLiteral =
    | `${number}`
    | "Infinity"
    | "-Infinity"
    | "+Infinity";

export interface NumberFormatterProps extends HTMLAttributes<HTMLSpanElement> {
    className?: string;
    number: number | bigint | StringNumericLiteral;
    variant?: keyof FormatVariant;
    options?: Intl.NumberFormatOptions;
    formatFromParts?: (parts: Intl.NumberFormatPart[]) => ReactNode;
}

export interface NumberRangeFormatterProps
    extends HTMLAttributes<HTMLSpanElement> {
    className?: string;
    range: readonly [
        start: number | bigint | StringNumericLiteral,
        end: number | bigint | StringNumericLiteral,
    ];
    variant?: keyof FormatVariant;
    options?: Intl.NumberFormatOptions;
    formatFromParts?: (parts: Intl.NumberRangeFormatPart[]) => ReactNode;
}

/**
 * Extracts the body and unit from the parts array.
 * @param parts
 */
export function makeBodyAndUnit(parts: Intl.NumberFormatPart[]) {
    const index = parts.findIndex((part) =>
        ["compact", "unit"].includes(part.type),
    );

    const body = parts
        .slice(0, index)
        .map((part) => part.value)
        .join("");

    const unit = parts
        .slice(index, parts.length)
        .map((part) => part.value)
        .join("");

    return [body, unit];
}
