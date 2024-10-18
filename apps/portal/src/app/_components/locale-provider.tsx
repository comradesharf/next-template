'use client';

import { type Messages, setupI18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { type PropsWithChildren, useState } from 'react';
import { DateTimeI18nContext } from '#app/_components/date-time.tsx';
import type { DateTimeI18nConfig } from '#app/_libs/locales/date-times.config.ts';

export interface LinguiClientProviderProps
    extends PropsWithChildren,
        DateTimeI18nConfig {
    initialLocale: string;
    initialMessages: Messages;
}

export function LocaleProvider({
    children,
    initialLocale,
    initialMessages,
    defaultFormatVariant,
    formatVariant,
}: LinguiClientProviderProps) {
    const [i18n] = useState(() => {
        return setupI18n({
            locale: initialLocale,
            messages: {
                [initialLocale]: initialMessages,
            },
        });
    });

    return (
        <I18nProvider i18n={i18n}>
            <DateTimeI18nContext
                formatVariant={formatVariant}
                defaultFormatVariant={defaultFormatVariant}
            >
                {children}
            </DateTimeI18nContext>
        </I18nProvider>
    );
}
