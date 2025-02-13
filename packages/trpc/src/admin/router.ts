import {
    router as $router,
    createCallerFactory,
    createTRPCContext,
} from "#admin/trpc.ts";

export { createTRPCContext };

export const router = $router({});

export type AdminRouter = typeof router;

export const createAdminCaller = createCallerFactory(router);
