import { AsyncLocalStorage } from "node:async_hooks";
import type { I18n } from "@lingui/core";
import type { TransProps } from "@lingui/react";
import { TransNoContext, getI18n } from "@lingui/react/server";
import { getI18nInstance } from "#messages.ts";

const asl = new AsyncLocalStorage<I18n>();

export function withI18n<T>(locale: string, fn: () => T): T {
    return asl.run(getI18nInstance(locale), fn);
}

export const i18n = {
    _(...args: Parameters<I18n["_"]>): string {
        let $i18n = getI18n()?.i18n;
        $i18n ??= asl.getStore();
        $i18n ??= getI18nInstance();
        if (!$i18n) {
            throw new Error("No i18n instance found in context");
        }
        return $i18n._(...args);
    },
};

export const t = i18n._.bind(i18n);

export function useLingui() {
    let i18n = getI18n()?.i18n;
    i18n ??= asl.getStore();
    i18n ??= getI18nInstance();

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
