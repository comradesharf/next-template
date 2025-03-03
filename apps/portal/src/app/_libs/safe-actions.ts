import "server-only";
import { t } from "@lingui/core/macro";
import * as Sentry from "@sentry/nextjs";
import * as Locales from "app-core/Locales";
import { Log } from "app-core/Log";
import { withI18n } from "app-i18n/lingui";
import { withUserAbilities } from "app-models/abilities.node";
import { ServerError, StatusCode } from "app-models/errors";
import type { HydratedDocument } from "app-models/model-utils";
import type { StructUser } from "app-models/models";
import { createSafeActionClient } from "next-safe-action";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { z } from "zod";
import { getHydratedCurrentUser } from "#app/_queries/auths.ts";

const ActionMetadataSchema = z.object({
    actionName: z.string(),
    access: z
        .enum(["all", "trusted-only", "anonymous-only"])
        .default("trusted-only")
        .optional(),
});

export const actionClient = createSafeActionClient({
    defineMetadataSchema: () => ActionMetadataSchema,
    handleServerError: (
        error,
        { metadata, bindArgsClientInputs, clientInput, ctx },
    ) => {
        const $ctx = ctx as {
            user: HydratedDocument<StructUser.User>;
            lang: string;
        };

        Log.error({
            err: error,
            user: $ctx.user
                ? {
                      id: $ctx.user?.id,
                      email: $ctx.user?.email,
                      username: $ctx.user?.displayName,
                      role: $ctx.user?.role,
                  }
                : null,
            action: {
                bindArgsClientInputs,
                clientInput,
                actionName: metadata.actionName,
                lang: $ctx.lang,
            },
        });

        Sentry.captureException(error, (scope) => {
            if ($ctx.user) {
                scope.setUser({
                    id: $ctx.user?.id,
                    email: $ctx.user?.email,
                    username: $ctx.user?.displayName,
                    role: $ctx.user?.role,
                });
            } else {
                scope.setUser(null);
            }

            scope.setContext("server-action", {
                bindArgsClientInputs,
                clientInput,
                actionName: metadata.actionName,
                lang: $ctx.lang,
            });

            scope.setTag("server-action", metadata.actionName);
            scope.setTag("lang", $ctx.lang);
            return scope;
        });

        if (error instanceof ServerError) {
            return { message: error.message, code: error.code };
        }

        return {
            message: t`Unexpected server error occurred`,
            code: StatusCode.INTERNAL_SERVER_ERROR,
        };
    },
})
    /**
     * This middleware is responsible for checking if the user is authenticated or not.
     */
    .use(async ({ next, metadata: { access = "trusted-only" } }) => {
        const user = await getHydratedCurrentUser();

        if (access === "trusted-only" && !user) {
            notFound();
        } else if (access === "anonymous-only" && user) {
            notFound();
        }

        return next({
            ctx: {
                user,
            },
        });
    })
    /**
     * This middleware is responsible for setting the language of the user.
     */
    .use(async ({ next, ctx: { user } }) => {
        const _cookies = await cookies();
        let lang = _cookies.get(Locales.CookieName)?.value;
        lang ??= user?.locale;
        lang ??= Locales.getRequestLocale(await headers());

        return withI18n(lang, () =>
            next({
                ctx: {
                    lang,
                },
            }),
        );
    })
    /**
     * This middleware is responsible for setting the user abilities.
     */
    .use(async ({ next, ctx: { user } }) =>
        withUserAbilities(
            () =>
                next({
                    ctx: {
                        user,
                    },
                }),
            user?.toJSON(),
        ),
    );
