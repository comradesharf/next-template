import type { PropsWithChildren } from "react";
import { DateTimeI18nContext } from "#app/_components/date-time.tsx";
import { GoogleMapProvider } from "#app/_components/google-map-provider.tsx";
import { MotionProvider } from "#app/_components/motion.tsx";
import { NumberI18Context } from "#app/_components/number.tsx";
import { QueryClientProvider } from "#app/_components/query-client-provider.tsx";
import { SessionProvider } from "#app/_components/session-provider.tsx";
import { TooltipProvider } from "#app/_components/tooltip.tsx";
import "#app/globals.css";

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <TooltipProvider>
            <QueryClientProvider>
                <SessionProvider>
                    <DateTimeI18nContext>
                        <NumberI18Context>
                            <GoogleMapProvider>
                                <MotionProvider>{children}</MotionProvider>
                            </GoogleMapProvider>
                        </NumberI18Context>
                    </DateTimeI18nContext>
                </SessionProvider>
            </QueryClientProvider>
        </TooltipProvider>
    );
}
