'use server';

import 'server-only';
import { SignUpSessionModel } from '@comradesharf/models/models/SignUpSessionModel';
import type { User } from '@comradesharf/models/models/User';
import { VerifyEmailSchema } from '@comradesharf/schemas/VerifyEmailSchema';
import { type FlattenMaps, connection } from 'mongoose';
import { z } from 'zod';
import { signIn as $signIn } from '#app/_libs/auths/auths.ts';
import { actionClient } from '#app/_libs/safe-actions.ts';

export const verifyEmail = actionClient
    .metadata({
        actionName: 'verifyEmail',
        public: true,
    })
    .schema(VerifyEmailSchema)
    .bindArgsSchemas([z.string()])
    .action(
        async ({ bindArgsParsedInputs: [session], parsedInput: { otp } }) => {
            let user: FlattenMaps<User>;
            await connection.transaction(async ($session) => {
                user = await SignUpSessionModel.verifyEmail(
                    {
                        session,
                        otp,
                    },
                    {
                        session: $session,
                    },
                );
            });
            await $signIn('credentials', {
                email: user!.email,
                type: 'system',
                redirectTo: '/overview',
            });
        },
    );
