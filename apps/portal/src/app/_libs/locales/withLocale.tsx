import { setI18n } from '@lingui/react/server';
import type * as React from 'react';
import { getI18nInstance } from '#app/_queries/i18n.ts';

export type Props = {
    params: Promise<{ lang: string }>;
};

export const withLocale = <T extends Props>(
    AppRouterPage: React.ComponentType<T>,
) => {
    return async function WithLocale(props: T) {
        const { lang } = await props.params;
        const i18n = await getI18nInstance(lang);
        setI18n(i18n);
        return <AppRouterPage {...props} />;
    };
};
