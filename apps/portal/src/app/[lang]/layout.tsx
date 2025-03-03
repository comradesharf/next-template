import "#app/globals.css";
import locales from "app-core/locales.json";
import { getI18nInstance } from "app-i18n/messages";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { LocaleProvider } from "#app/_components/locale-provider.tsx";
import { withLocale } from "#app/_components/locales.tsx";
import { cn } from "#app/_libs/cn.ts";
import { poppins } from "#app/_libs/fonts/fonts.ts";

export const metadata: Metadata = {
    title: "NexusHomes",
    description: "Get a free property valuation in seconds!",
};

export interface LayoutProps extends PropsWithChildren {
    params: Promise<{ lang: string }>;
}

export default withLocale(async function RootLayout({
    children,
    params,
}: LayoutProps) {
    const { lang } = await params;
    const i18n = getI18nInstance(lang);

    return (
        <html
            lang={i18n.locale}
            className={cn(
                "antialiased [font-synthesis-weight:none]",
                poppins.variable,
            )}
        >
            <body>
                <LocaleProvider
                    initialLocale={lang}
                    initialMessages={i18n.messages}
                >
                    {children}
                </LocaleProvider>
            </body>
        </html>
    );
});

export async function generateStaticParams() {
    return locales.map(({ value: lang }) => ({ lang }));
}
