import type { PropsWithChildren } from 'react';

export interface LayoutProps extends PropsWithChildren {
    params: { lang: string };
}

export default function Layout({ children }: LayoutProps) {
    return <>{children}</>;
}
