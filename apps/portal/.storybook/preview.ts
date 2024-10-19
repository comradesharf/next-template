import '#app/globals.css';
import type { Preview } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import {
    getSession,
    initialize,
    mswLoader,
    withAppendClassNamesToBody,
    withI18n,
    withTooltip,
} from '#app/_libs/decorators.tsx';
import { inter } from '#app/_libs/fonts.ts';
import { SupportedLocales } from '#app/_libs/locales/SupportedLocales.ts';

initialize();

const preview: Preview = {
    loaders: [mswLoader],
    globalTypes: {
        locale: {
            description: 'Internationalization locale',
            toolbar: {
                icon: 'globe',
                items: SupportedLocales,
            },
        },
        user: {
            description: 'User',
            toolbar: {
                icon: 'user',
                items: [
                    {
                        value: 'MEMBER',
                        title: 'Member',
                    },
                    {
                        value: 'ADMIN',
                        title: 'Admin',
                    },
                    {
                        value: 'ANON',
                        title: 'Anonymous',
                    },
                ],
            },
        },
    },
    initialGlobals: {
        locale: 'en',
        user: 'MEMBER',
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
        msw: {
            handlers: {
                auth: (ctx) => [
                    http.get('/api/auth/session', () => {
                        return HttpResponse.json(getSession(ctx.globals.user));
                    }),
                ],
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
