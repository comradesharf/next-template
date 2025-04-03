import type { PropsWithChildren } from "react";
import { MotionProvider } from "#app/_components/motion.tsx";
import { QueryClientProvider } from "#app/_components/query-client-provider.tsx";
import { TooltipProvider } from "#app/_components/tooltip.tsx";
import "#app/globals.css";

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <TooltipProvider>
            <QueryClientProvider>
                <MotionProvider>{children}</MotionProvider>
            </QueryClientProvider>
        </TooltipProvider>
    );
}
