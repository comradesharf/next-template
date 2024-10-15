import 'server-only';
import * as Sentry from '@sentry/nextjs';
import { createSafeActionClient } from 'next-safe-action';
import { cookies, headers } from 'next/headers';
import { z } from 'zod';
import { type ErrorPayload, ServerActionError } from '#app/_libs/errors.ts';
import {
    CookieName,
    getRequestLocale,
} from '#app/_libs/locales/getRequestLocale.ts';
import { getHydratedCurrentUser } from '#app/_queries/auths.ts';
import { getI18nInstance } from '#app/_queries/i18n.ts';

const ActionMetadataSchema = z.object({
    actionName: z.string(),
});

export const actionClient = createSafeActionClient({
    defineMetadataSchema: () => ActionMetadataSchema,
    handleServerError(
        error,
        { metadata, bindArgsClientInputs, clientInput, ctx },
    ): ErrorPayload {
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

        const instance =
            error instanceof ServerActionError
                ? error
                : new ServerActionError(
                      {
                          code: 'UNKNOWN',
                      },
                      error,
                  );

        return instance.toJSON();
    },
})
    .use(async ({ next }) => {
        const lang =
            cookies().get(CookieName)?.value || getRequestLocale(headers());

        const i18n = await getI18nInstance(lang);

        return next({
            ctx: {
                lang,
                i18n,
            },
        });
    })
    .use(async ({ next }) => {
        const user = await getHydratedCurrentUser();
        return next({
            ctx: {
                user,
            },
        });
    });
