'use server';

import 'server-only';
import { redirect } from 'next/navigation';
import { signOut as $signOut } from '#app/_libs/auths/auths.ts';
import { actionClient } from '#app/_libs/safe-actions.ts';

export const signOut = actionClient
    .metadata({
        actionName: 'signOut',
    })
    .action(async ({ ctx: { user } }) => {
        if (!user) {
            redirect('/sign-in');
        }

        await $signOut({
            redirectTo: '/sign-in',
        });
    });
