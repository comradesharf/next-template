import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "app-i18n/messages";
import type * as React from "react";

export type Props = {
    params: Promise<{ lang: string }>;
};

export const withLocale = <T extends Props>(
    AppRouterPage: React.ComponentType<T>,
) => {
    return async function WithLocale(props: T) {
        const params = await props.params;
        const i18n = getI18nInstance(params?.lang);
        setI18n(i18n);
        return <AppRouterPage {...props} />;
    };
};
