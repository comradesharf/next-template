import * as Sentry from "@sentry/nextjs";
import { TRPCError, initTRPC } from "@trpc/server";
import { withI18n } from "app-i18n/lingui";
import { withUserAbilities } from "app-models/abilities.node";
import { UnauthorizedError } from "app-models/errors";
import type { HydratedDocument } from "app-models/model-utils";
import { type StructUser, UserModel } from "app-models/models";
import superjson from "superjson";
import { ZodError } from "zod";

export interface Context {
    user?: HydratedDocument<StructUser.User>;
}

export async function createTRPCContext(req: Request): Promise<Context> {
    const authorization = req.headers.get("Authorization");
    if (!authorization) {
        return {};
    }

    const [, token] = authorization.split(/\s+/);

    if (!token) {
        return {};
    }

    try {
        const user = await UserModel.findById(token).orFail();

        return {
            user,
        };
    } catch (e) {
        if (e instanceof UnauthorizedError) {
            throw new TRPCError({
                cause: e,
                code: e.code,
                message: e.message,
            });
        }
        throw e;
    }
}

const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter: ({ shape, error }) => ({
        ...shape,
        data: {
            ...shape.data,
            zodError:
                error.cause instanceof ZodError ? error.cause.flatten() : null,
        },
    }),
});

export const createCallerFactory = t.createCallerFactory;

const sentryMiddleware = t.middleware(
    Sentry.trpcMiddleware({
        attachRpcInput: true,
    }),
);

export const router = t.router;

const procedure = t.procedure.use(sentryMiddleware);

export const publicProcedure = procedure
    .use(async ({ next }) => withI18n("en", () => next()))
    .use(async ({ next }) => withUserAbilities(() => next()));

export const privateProcedure = procedure
    .use(async ({ next, ctx }) => {
        if (!ctx.user) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
            });
        }
        return next();
    })
    .use(async ({ next, ctx }) => withI18n(ctx.user!.locale, () => next()))
    .use(async ({ next, ctx }) =>
        withUserAbilities(() => next(), ctx.user?.toJSON()),
    );
