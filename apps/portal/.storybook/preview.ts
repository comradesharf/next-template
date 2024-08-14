import '#app/globals.css';
import type { Preview } from '@storybook/react';

const preview = {
    globalTypes: {
        locale: {
            description: 'Internationalization locale',
            toolbar: {
                icon: 'globe',
                items: [{ value: 'en', title: 'English' }],
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
} as Preview;

export default preview;
