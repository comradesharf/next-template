import '#app/globals.css';
import { SupportedLocales } from '@comradesharf/core/SupportedLocales';
import type { Preview } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import {
    getSession,
    initialize,
    mswLoader,
    withRoot,
} from '#app/_libs/decorators.tsx';

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
    decorators: [withRoot],
};

export default preview;
