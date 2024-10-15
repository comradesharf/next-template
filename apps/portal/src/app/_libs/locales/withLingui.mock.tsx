import type { ComponentType } from 'react';

export const withLingui = (Component: ComponentType) =>
    function WithLingui(props: any) {
        return <Component {...props} />;
    };
