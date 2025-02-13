import { i18n } from "@lingui/core";
import type { TransProps } from "@lingui/react";
import { TransNoContext } from "@lingui/react/server";

export function withI18n<T>(_locale: string, _fn: () => T): T {
    throw new Error("withI18n is not available in the Storybook");
}

export { i18n };

export const t = i18n._.bind(i18n);

/**
 * We configure Lingui to use this hook in order for us to be able to mock it in Storybook.
 * This is because Lingui's `useLingui` hook is not a simple hook that we can mock with `jest.mock`.
 */
export function useLingui() {
    return { i18n, _: i18n._.bind(i18n) };
}

export function Trans(props: TransProps) {
    return <TransNoContext {...props} lingui={{ i18n }} />;
}
