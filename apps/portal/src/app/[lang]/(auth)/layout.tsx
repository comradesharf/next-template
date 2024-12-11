import type { PropsWithChildren } from "react";

export interface LayoutProps extends PropsWithChildren {
    params: Promise<{ lang: string }>;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40">
            {children}
        </div>
    );
}
