import { DefaultAdmin } from '@comradesharf/model-mocks/Admin';
import { DefaultMember } from '@comradesharf/model-mocks/Member';
import { faker } from '@faker-js/faker';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import type { DecoratorFunction, LoaderFunction } from '@storybook/csf';
import type { ReactRenderer, StoryContext } from '@storybook/react';
import type { HttpHandler } from 'msw';
import { type SetupWorker, setupWorker } from 'msw/browser';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useInsertionEffect } from 'react';
import { DateTimeI18nContext } from '#app/_components/date-time.tsx';
import { NumberI18Context } from '#app/_components/number.tsx';
import { TooltipProvider } from '#app/_components/tooltip.tsx';

declare module '@storybook/react' {
    interface Parameters {
        layout?: 'centered' | 'fullscreen' | 'padded';
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
                    [string, string] | [string, string, 'c' | 'oc']
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

export async function dynamicActivate(locale: string) {
    const { messages } = await import(
        `#app/_libs/locales/messages/${locale}.po`
    );
    i18n.loadAndActivate({ locale, messages });
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

    const session = getSession(ctx.globals.user);

    return (
        <SessionProvider refetchOnWindowFocus session={session}>
            <I18nProvider i18n={i18n}>
                <DateTimeI18nContext>
                    <NumberI18Context>
                        <Story />
                    </NumberI18Context>
                </DateTimeI18nContext>
            </I18nProvider>
        </SessionProvider>
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

export const withTooltip: DecoratorFunction<ReactRenderer> = (Story) => {
    return (
        <TooltipProvider>
            <Story />
        </TooltipProvider>
    );
};

const fileExtensionPattern = /\.(js|jsx|ts|tsx|mjs|woff|woff2|ttf|otf|eot)$/;
const filteredURLSubstrings = [
    'sb-common-assets',
    'node_modules',
    'node-modules',
    'hot-update.json',
    '__webpack_hmr',
    'iframe.html',
    'sb-vite',
    '@vite',
    '@react-refresh',
    '/virtual:',
    '.stories.',
    '.mdx',
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
            if (pathname.startsWith('/api')) {
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

export const mswLoader: LoaderFunction<ReactRenderer, any> = async (
    context: StoryContext,
) => {
    await waitForMswReady();
    applyRequestHandlers(context);
    return {};
};

export function getSession(user: string) {
    switch (user) {
        case 'MEMBER':
            return {
                user: {
                    email: DefaultMember.email,
                    id: DefaultMember._id,
                    name: DefaultMember.display_name,
                    timezone: DefaultMember.timezone,
                },
                expires: faker.date.future().toISOString(),
            };
        case 'ADMIN':
            return {
                user: {
                    email: DefaultAdmin.email,
                    id: DefaultAdmin._id,
                    name: DefaultAdmin.display_name,
                    timezone: DefaultAdmin.timezone,
                },
                expires: faker.date.future().toISOString(),
            };
        default:
            return null;
    }
}
