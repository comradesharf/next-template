import { setI18n } from '@lingui/react/server';
import type * as React from 'react';
import { getI18nInstance } from '#app/_queries/i18n.ts';

export type LangParams = {
    params: { lang: string };
    children?: React.ReactNode;
};

type LayoutExposedToNextJS<Props> = (props: Props) => React.ReactNode;

export const withLingui = <Props extends {}>(
    AppRouterPage: React.ComponentType<LangParams & Props>,
): LayoutExposedToNextJS<Props & LangParams> => {
    return async function WithLingui(props) {
        const lang = props.params.lang;
        const i18n = await getI18nInstance(lang);
        setI18n(i18n);
        return <AppRouterPage {...props} />;
    };
};
