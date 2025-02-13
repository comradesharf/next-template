import "#app/globals.css";
import type { Preview } from "@storybook/react";
import locales from "app-core/locales.json";
import { http, HttpResponse } from "msw";
import { getSession, withRoot } from "#app/_libs/decorators.tsx";

// initialize();

const preview: Preview = {
    // loaders: [mswLoader],
    globalTypes: {
        locale: {
            description: "Internationalization locale",
            toolbar: {
                icon: "globe",
                items: locales,
            },
        },
        user: {
            description: "User",
            toolbar: {
                icon: "user",
                items: [
                    {
                        value: "ANON",
                        title: "Anonymous",
                    },
                ],
            },
        },
    },
    initialGlobals: {
        locale: "en",
        user: "ANON",
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
        msw: {
            handlers: {
                auth: (ctx) => [
                    http.get("/api/auth/session", () => {
                        return HttpResponse.json(getSession(ctx.globals.user));
                    }),
                ],
            },
        },
    },
    decorators: [withRoot],
};

export default preview;
