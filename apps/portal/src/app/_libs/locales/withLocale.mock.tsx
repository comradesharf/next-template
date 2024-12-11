import type { ComponentType } from "react";

export const withLocale = (Component: ComponentType) =>
    function WithLocale(props: any) {
        return <Component {...props} />;
    };
