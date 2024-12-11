import Negotiator from "negotiator";
import linguiConfig from "#app/_libs/locales/lingui.config.ts";

export function getRequestLocale(requestHeaders: Headers): string {
    const langHeader = requestHeaders.get("accept-language") || undefined;
    const languages = new Negotiator({
        headers: { "accept-language": langHeader },
    }).languages(linguiConfig.locales.slice());
    return languages[0] || linguiConfig.locales[0] || "en";
}

export const CookieName = "next.lang";
