'use server';

import 'server-only';
import { signOut as $signOut } from '#app/_libs/auths/auths.ts';
import { actionClient } from '#app/_libs/safe-actions.ts';

export const signOut = actionClient
    .metadata({
        actionName: 'signOut',
    })
    .action(async () => {
        await $signOut({
            redirectTo: '/sign-in',
        });
    });
