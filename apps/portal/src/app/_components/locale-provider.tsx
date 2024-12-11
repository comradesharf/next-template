"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type PropsWithChildren, useState } from "react";

export interface LinguiClientProviderProps extends PropsWithChildren {
    initialLocale: string;
    initialMessages: Messages;
}

export function LocaleProvider({
    children,
    initialLocale,
    initialMessages,
}: LinguiClientProviderProps) {
    const [i18n] = useState(() => {
        return setupI18n({
            locale: initialLocale,
            messages: {
                [initialLocale]: initialMessages,
            },
        });
    });

    return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
