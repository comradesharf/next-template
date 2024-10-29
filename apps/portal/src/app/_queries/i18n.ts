import 'server-only';
import { SupportedLocales } from '@comradesharf/core/SupportedLocales';
import { type I18n, type Messages, setupI18n } from '@lingui/core';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

async function loadCatalog({
    value: locale,
}: { value: string }): Promise<readonly [string, Messages]> {
    const { messages } = await import(`../_libs/locales/messages/${locale}.ts`);
    return [locale, messages];
}

const getAllI18nMessages = unstable_cache(async () => {
    const catalogs = await Promise.all(SupportedLocales.map(loadCatalog));
    return Object.fromEntries(catalogs);
});

export const getI18nMessage = cache(async (locale: string) => {
    const messages = await getAllI18nMessages();
    if (!messages[locale]) {
        console.warn(`No i18n message found for locale "${locale}"`);
    }
    return messages[locale] || messages.en;
});

const getAllI18nInstances = cache(async () => {
    const allMessages = await getAllI18nMessages();

    const entries = Object.entries(allMessages).map(([locale, messages]) => {
        return [
            locale,
            setupI18n({
                locale,
                messages: { [locale]: messages },
            }),
        ];
    });

    return Object.fromEntries(entries);
});

export const getI18nInstance = cache(async (locale: string): Promise<I18n> => {
    const allI18nInstances = await getAllI18nInstances();
    if (!allI18nInstances[locale]) {
        console.warn(`No i18n instance found for locale "${locale}"`);
    }
    return allI18nInstances[locale] || allI18nInstances.en;
});
