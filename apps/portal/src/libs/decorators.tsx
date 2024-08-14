import type { DecoratorFunction } from '@storybook/csf';
import type { ReactRenderer } from '@storybook/react';
import { useInsertionEffect } from 'react';
import type { Simplify } from 'type-fest';
import { LinguiClientProvider } from '#app/_components/lingui-client-provider.tsx';
import { allMessages } from '#libs/locales/appRouterI18n.ts';
import { withLinguiLayout } from '#libs/locales/withLingui.tsx';

const RootLayout = withLinguiLayout(function RootLayout({
    children,
    params: { lang },
}) {
    return (
        <LinguiClientProvider
            initialLocale={lang}
            initialMessages={allMessages[lang]}
        >
            {children}
        </LinguiClientProvider>
    );
});

export const withI18n: DecoratorFunction<
    ReactRenderer,
    Simplify<{ params: { lang: string } }>
> = (Story, ctx) => {
    ctx.args.params ??= {
        lang: ctx.globals.locale,
    };
    ctx.args.params.lang = ctx.globals.locale;
    return (
        <RootLayout params={{ lang: ctx.globals.locale }}>
            <Story />
        </RootLayout>
    );
};

export const withAppendClassNamesToBody: (
    ...classNames: string[]
) => DecoratorFunction<ReactRenderer> = (...classNames) =>
    function Component(Story) {
        console.log('Test');
        useInsertionEffect(() => {
            document.documentElement.classList.add(...classNames);
        }, [classNames]);
        return <Story />;
    };
