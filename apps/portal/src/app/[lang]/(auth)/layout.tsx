import type { PropsWithChildren } from 'react';

export interface LayoutProps extends PropsWithChildren {
    params: Promise<{ lang: string }>;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 justify-center items-center">
            {children}
        </div>
    );
}
