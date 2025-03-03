import Negotiator from "negotiator";
import locales from "#locales.json";

/**
 * Normalize locale string to array of possible values.
 *
 * @param locale
 */
export function normalizeLocale(locale: string): string[] {
    const [head, tail] = locale.split("-");
    return [
        ...new Set([
            [head.toLocaleLowerCase(), tail?.toUpperCase()]
                .filter(Boolean)
                .join(""),
            head.toLocaleLowerCase(),
        ]),
    ];
}

/**
 * Get the locale from the request headers.
 *
 * @param requestHeaders
 */
export function getRequestLocale(requestHeaders: Headers): string {
    let language = new Negotiator({
        headers: Object.fromEntries(requestHeaders),
    }).language(locales.map((locale) => locale.value));
    language ??= locales[0]?.value;
    language ??= "en";
    return language;
}

export const CookieName = "next.lang";
