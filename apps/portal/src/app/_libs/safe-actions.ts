import 'server-only';
import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';
import { type ErrorPayload, ServerActionError } from '#app/_libs/errors.ts';

const ActionMetadataSchema = z.object({
    actionName: z.string(),
});

export const actionClient = createSafeActionClient({
    defineMetadataSchema: () => ActionMetadataSchema,
    handleServerError(error): ErrorPayload {
        if (error instanceof ServerActionError) {
            return error.toJSON();
        }
        return new ServerActionError(
            {
                code: 'UNKNOWN',
            },
            error,
        ).toJSON();
    },
});
