import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

const ActionMetadataSchema = z.object({
    actionName: z.string(),
});

export const actionClient = createSafeActionClient({
    defineMetadataSchema: () => ActionMetadataSchema,
});
