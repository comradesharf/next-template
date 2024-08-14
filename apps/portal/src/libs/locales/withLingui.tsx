import { setI18n } from '@lingui/react/server';
import type * as React from 'react';
import { getI18nInstance } from '#libs/locales/appRouterI18n.ts';

export type PageLangParam = {
    params: { lang: string };
};

type PageProps = PageLangParam & {
    searchParams?: unknown; // in query
};

type LayoutProps = PageLangParam & {
    children?: React.ReactNode;
};

type PageExposedToNextJS<Props extends PageProps> = (
    props: Props,
) => React.ReactNode;

export const withLinguiPage = <Props extends PageProps>(
    AppRouterPage: React.ComponentType<PageLangParam & Props>,
): PageExposedToNextJS<Props> => {
    return function WithLingui(props) {
        const lang = props.params.lang;
        const i18n = getI18nInstance(lang);
        setI18n(i18n);
        return <AppRouterPage {...props} lang={lang} />;
    };
};

type LayoutExposedToNextJS<Props extends LayoutProps> = (
    props: Props,
) => React.ReactNode;

export const withLinguiLayout = <Props extends LayoutProps>(
    AppRouterPage: React.ComponentType<PageLangParam & Props>,
): LayoutExposedToNextJS<Props> => {
    return function WithLingui(props) {
        const lang = props.params.lang;
        const i18n = getI18nInstance(lang);
        setI18n(i18n);
        return <AppRouterPage {...props} lang={lang} />;
    };
};
