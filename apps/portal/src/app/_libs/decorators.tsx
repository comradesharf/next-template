import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import type { DecoratorFunction } from '@storybook/csf';
import type { ReactRenderer } from '@storybook/react';
import { useEffect, useInsertionEffect } from 'react';
import { TooltipProvider } from '#app/_components/tooltip.tsx';

export async function dynamicActivate(locale: string) {
    const { messages } = await import(
        `#app/_libs/locales/messages/${locale}.po`
    );
    i18n.load(locale, messages);
    i18n.activate(locale);
}

export const withI18n: DecoratorFunction<any, any> = (Story, ctx) => {
    ctx.args.params ??= {
        lang: ctx.globals.locale,
    };
    ctx.args.params.lang = ctx.globals.locale;

    const lang = ctx.args.params.lang;

    useEffect(() => {
        void dynamicActivate(lang);
    }, [lang]);

    return (
        <I18nProvider i18n={i18n}>
            <Story />
        </I18nProvider>
    );
};

export const withAppendClassNamesToBody: (
    ...classNames: string[]
) => DecoratorFunction<ReactRenderer> = (...classNames) =>
    function Component(Story) {
        useInsertionEffect(() => {
            document.documentElement.classList.add(...classNames);
        }, [classNames]);
        return <Story />;
    };

export const withTooltip: DecoratorFunction<ReactRenderer> = (Story, ctx) => {
    return (
        <TooltipProvider>
            <Story />
        </TooltipProvider>
    );
};
