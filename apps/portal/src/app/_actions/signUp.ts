'use server';

import 'server-only';
import { MemberModel } from '@comradesharf/models/models/MemberModel';
import { SignUpSchema } from '@comradesharf/schemas/SignUpSchema';
import { redirect } from 'next/navigation';
import { actionClient } from '#app/_libs/safe-actions.ts';

export const signUp = actionClient
    .metadata({
        actionName: 'signUp',
    })
    .schema(SignUpSchema)
    .action(
        async ({
            parsedInput: { confirm_password, display_name, email, password },
        }) => {
            await MemberModel.signUp({
                confirm_password,
                display_name,
                email,
                password,
            });
            redirect('/sign-in');
        },
    );
