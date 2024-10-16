import '#app/globals.css';
import type { Metadata } from 'next';
import { LinguiClientProvider } from '#app/_components/lingui-client-provider.tsx';
import { getI18nMessage } from '#app/_queries/i18n.ts';
import { cn } from '#libs/cn.ts';
import { inter } from '#libs/fonts.ts';
import linguiConfig from '#libs/locales/lingui.config.ts';
import { withLingui } from '#libs/locales/withLingui.tsx';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default withLingui(async function RootLayout({
    children,
    params: { lang },
}) {
    return (
        <html
            lang={lang}
            className={cn(
                'antialiased [font-synthesis-weight:none]',
                inter.variable,
            )}
        >
            <LinguiClientProvider
                initialLocale={lang}
                initialMessages={await getI18nMessage(lang)}
            >
                <body>{children}</body>
            </LinguiClientProvider>
        </html>
    );
});

export async function generateStaticParams() {
    return linguiConfig.locales.map((lang) => ({ lang }));
}
