'use server';

import 'server-only';
import { SignUpSchema } from '@comradesharf/schemas/SignUpSchema';
import { actionClient } from '#libs/safe-actions.ts';

export const signUp = actionClient
    .metadata({
        actionName: 'signUp',
    })
    .schema(SignUpSchema)
    .action(async () => {});
