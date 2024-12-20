import '#app/globals.css';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { DateTimeI18nContext } from '#app/_components/date-time.tsx';
import { LocaleProvider } from '#app/_components/locale-provider.tsx';
import { NumberI18Context } from '#app/_components/number.tsx';
import { SessionProvider } from '#app/_components/session-provider.tsx';
import { SidebarProvider } from '#app/_components/sidebar.tsx';
import { TooltipProvider } from '#app/_components/tooltip.tsx';
import { cn } from '#app/_libs/cn.ts';
import { inter } from '#app/_libs/fonts.ts';
import linguiConfig from '#app/_libs/locales/lingui.config.ts';
import { withLocale } from '#app/_libs/locales/withLocale.tsx';
import { getI18nMessage } from '#app/_queries/i18n.ts';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export interface LayoutProps extends PropsWithChildren {
    params: Promise<{ lang: string }>;
}

export default withLocale(async function RootLayout({
    children,
    params,
}: LayoutProps) {
    const { lang } = await params;

    return (
        <html
            lang={lang}
            className={cn(
                'antialiased [font-synthesis-weight:none]',
                inter.variable,
            )}
        >
            <body>
                <TooltipProvider>
                    <LocaleProvider
                        initialLocale={lang}
                        initialMessages={await getI18nMessage(lang)}
                    >
                        <SessionProvider>
                            <DateTimeI18nContext>
                                <NumberI18Context>
                                    <SidebarProvider>
                                        {children}
                                    </SidebarProvider>
                                </NumberI18Context>
                            </DateTimeI18nContext>
                        </SessionProvider>
                    </LocaleProvider>
                </TooltipProvider>
            </body>
        </html>
    );
});

export async function generateStaticParams() {
    return linguiConfig.locales.map((lang) => ({ lang }));
}
