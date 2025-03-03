"use client";

import "client-only";
import { i18n } from "@lingui/core";
import { useLingui as useLingui$ } from "@lingui/react";

export { Trans } from "@lingui/react";

export { i18n };

export function withI18n<T>(_locale: string, _fn: () => T): T {
    throw new Error("withI18n is not available in Client Component");
}

export const t = i18n._.bind(i18n);

export function useLingui() {
    return useLingui$();
}
