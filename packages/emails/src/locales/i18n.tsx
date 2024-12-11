import { type I18n, setupI18n } from "@lingui/core";
import { TransNoContext, type TransProps } from "@lingui/react/server";
import { messages as de } from "#locales/messages/de.ts";
import { messages as en } from "#locales/messages/en.ts";
import { messages as msMY } from "#locales/messages/ms-MY.ts";

const catalogs = {
    en,
    de,
    "ms-MY": msMY,
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

const asl = new AsyncLocalStorage<I18n>();

export function withI18n<T>(locale: string, fn: () => T): T {
    return asl.run(getI18nInstance(locale), fn);
}

export function useLingui() {
    const i18n = asl.getStore() ?? instances.en;

    if (!i18n) {
        throw new Error("No i18n instance found in context");
    }

    return {
        i18n,
        _: i18n._.bind(i18n),
    };
}

export function Trans(props: TransProps) {
    const ctx = useLingui();
    if (!ctx.i18n) {
        throw new Error("No i18n instance found in context");
    }
    return (
        <TransNoContext
            {...props}
            lingui={{
                i18n: ctx.i18n,
            }}
        />
    );
}
