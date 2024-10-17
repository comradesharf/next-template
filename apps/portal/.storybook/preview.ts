import '#app/globals.css';
import type { Preview } from '@storybook/react';
import {
    withAppendClassNamesToBody,
    withI18n,
    withTooltip,
} from '#app/_libs/decorators.tsx';
import { inter } from '#app/_libs/fonts.ts';
import { SupportedLocales } from '#app/_libs/locales/SupportedLocales.ts';

const preview: Preview = {
    globalTypes: {
        locale: {
            description: 'Internationalization locale',
            toolbar: {
                icon: 'globe',
                items: SupportedLocales,
            },
        },
    },
    initialGlobals: {
        locale: 'en',
    },
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        nextjs: {
            appDirectory: true,
        },
        layout: 'fullscreen',
        docs: {
            story: {
                inline: false,
                height: 1000,
            },
        },
    },
    decorators: [
        withAppendClassNamesToBody(
            'antialiased',
            '[font-synthesis-weight:none]',
            inter.variable,
        ),
        withI18n,
        withTooltip,
    ],
};

export default preview;
