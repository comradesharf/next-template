import type { Preview } from "@storybook/react";
import locales from "app-core/locales.json";
import { withRoot } from "#decorators.tsx";

const preview: Preview = {
    globalTypes: {
        locale: {
            description: "Internationalization locale",
            toolbar: {
                icon: "globe",
                items: locales,
            },
        },
    },
    initialGlobals: {
        locale: "en",
    },
    parameters: {
        test: {
            clearMocks: true,
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        nextjs: {
            appDirectory: true,
        },
        layout: "fullscreen",
        docs: {
            story: {
                inline: false,
                height: 1000,
            },
        },
    },
    decorators: [withRoot],
};

export default preview;
