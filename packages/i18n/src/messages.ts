import { type I18n, type Messages, setupI18n } from "@lingui/core";
import locales from "app-core/locales.json";

const allI18nMessages = Object.fromEntries(
    await Promise.all(
        locales.map(async ({ value }) => {
            const { messages } = await import(`./locales/${value}.ts`);
            return [value, messages as Messages] as const;
        }),
    ),
);

const allI18nInstances = Object.fromEntries(
    Object.entries(allI18nMessages).map(([locale, messages]) => {
        return [
            locale,
            setupI18n({
                locale,
                messages: { [locale]: messages },
            }),
        ];
    }),
);

export function getI18nInstance(locale = "en"): I18n {
    if (!allI18nInstances[locale]) {
        console.warn(`No i18n instance found for locale "${locale}"`);
    }
    return allI18nInstances[locale] || allI18nInstances.en;
}
