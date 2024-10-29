import { type I18n, setupI18n } from '@lingui/core';
import { messages as de } from '#locales/messages/de.ts';
import { messages as en } from '#locales/messages/en.ts';
import { messages as msMY } from '#locales/messages/ms-MY.ts';

const catalogs = {
    en,
    de,
    'ms-MY': msMY,
};

const instances = Object.fromEntries(
    Object.entries(catalogs).map(([locale, messages]) => {
        return [
            locale,
            setupI18n({
                locale,
                messages: { [locale]: messages },
            }),
        ];
    }),
);

export function getI18nInstance(locale: string): I18n {
    if (!instances[locale]) {
        console.warn(`No i18n instance found for locale "${locale}"`);
    }
    return instances[locale] || instances.en;
}
