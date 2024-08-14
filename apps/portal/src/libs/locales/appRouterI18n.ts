import 'server-only';
import { type I18n, type Messages, setupI18n } from '@lingui/core';
import linguiConfig from '#libs/locales/lingui.config.ts';

const { locales } = linguiConfig;
// optionally use a stricter union type
type SupportedLocales = string;

async function loadCatalog(
    locale: SupportedLocales,
): Promise<readonly [string, Messages]> {
    const { messages } = await import(`#libs/locales/messages/${locale}.po`);
    return [locale, messages];
}

const catalogs = await Promise.all(locales.map(loadCatalog));

// transform array of catalogs into a single object
export const allMessages = Object.fromEntries(catalogs);

type AllI18nInstances = { [K in SupportedLocales]: I18n };

export const allI18nInstances: AllI18nInstances = Object.fromEntries(
    locales.map((locale) => {
        return [
            locale,
            setupI18n({
                locale,
                messages: { [locale]: allMessages[locale] },
            }),
        ];
    }),
);

export const getI18nInstance = (locale: SupportedLocales): I18n => {
    if (!allI18nInstances[locale]) {
        console.warn(`No i18n instance found for locale "${locale}"`);
    }
    return allI18nInstances[locale] || allI18nInstances.en;
};
