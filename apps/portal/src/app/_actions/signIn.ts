'use server';

import 'server-only';
import { SignInError } from '@auth/core/errors';
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
                redirectTo: '/dashboard',
            });
        } catch (e) {
            if (e instanceof SignInError) {
                throw new ServerActionError(
                    {
                        code: 'INVALID_CREDENTIALS',
                    },
                    e,
                );
            }
            throw e;
        }
    });
