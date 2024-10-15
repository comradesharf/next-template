'use server';

import 'server-only';
import { SignInSchema } from '@comradesharf/schemas/SignInSchema';
import { signIn as $signIn } from '#app/_libs/auths/auths.ts';
import { ServerActionError } from '#app/_libs/errors.ts';
import { actionClient } from '#app/_libs/safe-actions.ts';

export const signIn = actionClient
    .metadata({
        actionName: 'signIn',
    })
    .schema(SignInSchema)
    .action(async ({ parsedInput: { email, password } }) => {
        try {
            await $signIn('credentials', {
                email,
                password,
            });
        } catch (e) {
            throw new ServerActionError(
                {
                    code: 'INVALID_CREDENTIALS',
                },
                e,
            );
        }
    });
