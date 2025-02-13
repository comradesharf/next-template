import type * as React from "react";

export type Props = {
    params: Promise<{ lang: string }>;
};

export const withLocale = <T extends Props>(
    AppRouterPage: React.ComponentType<T>,
) => {
    return async function WithLocale(props: T) {
        return <AppRouterPage {...props} />;
    };
};
