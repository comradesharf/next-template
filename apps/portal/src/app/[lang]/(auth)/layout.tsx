import type { PropsWithChildren } from 'react';

export interface LayoutProps extends PropsWithChildren {
    params: Promise<{ lang: string }>;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {children}
        </div>
    );
}
