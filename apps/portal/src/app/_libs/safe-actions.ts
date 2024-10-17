import 'server-only';
import * as Sentry from '@sentry/nextjs';
import { createSafeActionClient } from 'next-safe-action';
import { headers } from 'next/headers';
import { z } from 'zod';
import { type ErrorPayload, ServerActionError } from '#app/_libs/errors.ts';

const ActionMetadataSchema = z.object({
    actionName: z.string(),
});

export const actionClient = createSafeActionClient({
    defineMetadataSchema: () => ActionMetadataSchema,
    handleServerError(
        error,
        { metadata, bindArgsClientInputs, clientInput },
    ): ErrorPayload {
        Sentry.captureException(error, (scope) => {
            scope.setContext('server-action', {
                bindArgsClientInputs,
                clientInput,
                actionName: metadata.actionName,
            });
            scope.setTag('server-action', metadata.actionName);
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
}).use(({ next, ctx }) => {
    console.log([...headers()]);
    return next({});
});
