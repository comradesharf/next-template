import { AsyncLocalStorage } from "node:async_hooks";
import type { I18n } from "@lingui/core";
import type { TransProps } from "@lingui/react";
import { getI18nInstance } from "#messages.ts";

const asl = new AsyncLocalStorage<I18n>();

export function withI18n<T>(locale: string, fn: () => T): T {
    return asl.run(getI18nInstance(locale), fn);
}

export const i18n = {
    _(...args: Parameters<I18n["_"]>): string {
        // @ts-expect-error
        return msg(...args);
    },
} as I18n;

export const t = i18n._.bind(i18n);

export function useLingui() {
    return {
        i18n,
        _: i18n._.bind(i18n),
        t,
    };
}

export function Trans(props: TransProps) {
    // @ts-expect-error
    return props.children;
}

export function msg(literals: TemplateStringsArray, ...placeholders: any[]) {
    return literals.reduce((acc, literal, index) => {
        return acc + literal + (placeholders[index] ?? "");
    }, "");
}
