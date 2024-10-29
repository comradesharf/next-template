import 'server-only';
import {
    type ErrorPayload,
    ServerActionError,
} from '@comradesharf/models/utils/errors';
import * as Sentry from '@sentry/nextjs';
import { createSafeActionClient } from 'next-safe-action';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { I18nServerActionError } from '#app/_libs/errors.ts';
import {
    CookieName,
    getRequestLocale,
} from '#app/_libs/locales/getRequestLocale.ts';
import { getHydratedCurrentUser } from '#app/_queries/auths.ts';
import { getI18nInstance } from '#app/_queries/i18n.ts';

const ActionMetadataSchema = z.object({
    actionName: z.string(),
    public: z.boolean().default(false).optional(),
});

export const actionClient = createSafeActionClient({
    defineMetadataSchema: () => ActionMetadataSchema,
    handleServerError: (
        error,
        { metadata, bindArgsClientInputs, clientInput, ctx },
    ): ErrorPayload => {
        console.error(error);

        const $ctx = ctx as { user: any; lang: string };

        Sentry.captureException(error, (scope) => {
            if ($ctx.user) {
                scope.setUser({
                    id: $ctx.user?.id,
                    email: $ctx.user?.email,
                    username: $ctx.user?.display_name,
                    role: $ctx.user?.role,
                });
            } else {
                scope.setUser(null);
            }

            scope.setContext('server-action', {
                bindArgsClientInputs,
                clientInput,
                actionName: metadata.actionName,
                lang: $ctx.lang,
            });

            scope.setTag('server-action', metadata.actionName);
            scope.setTag('lang', $ctx.lang);
            return scope;
        });

        let instance: I18nServerActionError;

        if (error instanceof I18nServerActionError) {
            instance = error;
        } else if (error instanceof ServerActionError) {
            instance = new I18nServerActionError(error.payload, error.cause);
        } else {
            instance = new I18nServerActionError(
                {
                    code: 'UNKNOWN',
                },
                error,
            );
        }

        return instance.toJSON();
    },
})
    .use(async ({ next }) => {
        const lang =
            (await cookies()).get(CookieName)?.value ||
            getRequestLocale(await headers());

        const i18n = await getI18nInstance(lang);

        return next({
            ctx: {
                lang,
                i18n,
            },
        });
    })
    .use(async ({ next, metadata: { public: $public } }) => {
        const user = await getHydratedCurrentUser();

        if (!$public && !user) {
            redirect('/sign-in');
        }

        return next({
            ctx: {
                user,
            },
        });
    });
