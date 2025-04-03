"use client";

import { i18n } from "@lingui/core";
import type { Decorator, Loader, StoryContext } from "@storybook/react";
import type { HttpHandler } from "msw";
import { type SetupWorker, setupWorker } from "msw/browser";
import { use, useInsertionEffect } from "react";
import { DateTimeI18nContext } from "#app/_components/date-time.tsx";
import { GoogleMapProvider } from "#app/_components/google-map-provider.tsx";
import { MotionProvider } from "#app/_components/motion.tsx";
import { NumberI18Context } from "#app/_components/number.tsx";
import { QueryClientProvider } from "#app/_components/query-client-provider.tsx";
import { TooltipProvider } from "#app/_components/tooltip.tsx";
import { poppins } from "#app/_libs/fonts/fonts.ts";

declare module "@storybook/react" {
    interface Parameters {
        layout?: "centered" | "fullscreen" | "padded";
        docs?: {
            story?: {
                inline?: boolean;
                height?: number | string;
            };
        };
        nextjs?: {
            appDirectory?: boolean;
            navigation?: {
                pathname?: string;
                query?: any;
                segments?: ReadonlyArray<
                    [string, string] | [string, string, "c" | "oc"]
                >;
            };
        };
        msw?: {
            handlers: Record<
                string,
                <TArgs>(ctx: StoryContext<TArgs>) => HttpHandler[]
            >;
        };
    }
}

export const withRoot: Decorator<any> = (Story, ctx) => {
    ctx.args.params = Promise.resolve({
        ...ctx.args.params,
        lang: ctx.globals.locale,
    });

    const locale = ctx.globals.locale;

    useInsertionEffect(() => {
        document.documentElement.classList.add(
            "antialiased",
            "[font-synthesis-weight:none]",
            poppins.variable,
        );
    }, []);

    const { getI18nInstance } = use(import("app-i18n/messages"));
    const $i18n = getI18nInstance(locale);

    i18n.loadAndActivate({
        locale: $i18n.locale,
        messages: $i18n.messages,
    });

    return (
        <QueryClientProvider>
            <DateTimeI18nContext>
                <NumberI18Context>
                    <TooltipProvider>
                        <GoogleMapProvider>
                            <MotionProvider>
                                <Story />
                            </MotionProvider>
                        </GoogleMapProvider>
                    </TooltipProvider>
                </NumberI18Context>
            </DateTimeI18nContext>
        </QueryClientProvider>
    );
};

const fileExtensionPattern = /\.(js|jsx|ts|tsx|mjs|woff|woff2|ttf|otf|eot)$/;
const filteredURLSubstrings = [
    "sb-common-assets",
    "node_modules",
    "node-modules",
    "hot-update.json",
    "__webpack_hmr",
    "iframe.html",
    "sb-vite",
    "@vite",
    "@react-refresh",
    "/virtual:",
    ".stories.",
    ".mdx",
    "googleapis.com",
];

const shouldFilterUrl = (url: string) => {
    // files which are mostly noise from webpack/vite builders + font files
    if (fileExtensionPattern.test(url)) {
        return true;
    }

    return filteredURLSubstrings.some((substring) => url.includes(substring));
};

export const augmentInitializeOptions = () => {
    return {
        // Filter requests that we know are not relevant to the user e.g. HMR, builder requests, statics assets, etc.
        onUnhandledRequest: (...args: any[]) => {
            const [{ url, method }] = args;
            if (shouldFilterUrl(url)) {
                return;
            }

            const pathname = new URL(url).pathname;
            if (pathname.startsWith("/api")) {
                console.error(`Unhandled ${method} request to ${url}.

        This exception has been only logged in the console, however, it's strongly recommended to resolve this error as you don't want unmocked data in Storybook stories.

        If you wish to mock an error response, please refer to this guide: https://mswjs.io/docs/recipes/mocking-error-responses
      `);
            }
        },
    };
};

export function applyRequestHandlers<TArgs>(
    context: StoryContext<TArgs>,
): void {
    api?.resetHandlers();

    if (!context.parameters?.msw?.handlers) {
        return;
    }

    // Support an Array named request handlers
    // or an Object of named request handlers with named arrays of handlers
    const handlers = Object.values(context.parameters.msw.handlers).flatMap(
        (handler) => handler(context),
    );

    if (handlers.length > 0) {
        api.use(...handlers);
    }

    return;
}

export let api: SetupWorker;

type ContextfulWorker = SetupWorker & {
    context: { activationPromise?: any };
};

export function initialize(): SetupWorker {
    const worker = setupWorker() as ContextfulWorker;
    worker.context.activationPromise = worker.start(augmentInitializeOptions());
    api = worker;
    return worker;
}

export async function waitForMswReady() {
    const msw = getWorker() as ContextfulWorker;
    await msw.context.activationPromise;
}

export function getWorker(): SetupWorker {
    if (api === undefined) {
        throw new Error(
            `[MSW] Failed to retrieve the worker: no active worker found. Did you forget to call "initialize"?`,
        );
    }

    return api;
}

export const mswLoader: Loader<any> = async (context: StoryContext) => {
    await waitForMswReady();
    applyRequestHandlers(context);
    return {};
};

export function getSession(user: string) {
    switch (user) {
        default:
            return null;
    }
}
