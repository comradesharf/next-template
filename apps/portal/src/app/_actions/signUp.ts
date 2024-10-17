'use server';

import 'server-only';
import { MemberModel } from '@comradesharf/models/models/MemberModel';
import { SignUpSchema } from '@comradesharf/schemas/SignUpSchema';
import { t } from '@lingui/macro';
import { MongoServerError } from 'mongodb';
import { returnValidationErrors } from 'next-safe-action';
import { redirect } from 'next/navigation';
import { signIn as $signIn } from '#app/_libs/auths/auths.ts';
import { actionClient } from '#app/_libs/safe-actions.ts';

export const signUp = actionClient
    .metadata({
        actionName: 'signUp',
    })
    .schema(SignUpSchema)
    .action(
        async ({
            parsedInput: { confirm_password, display_name, email, password },
            ctx: { i18n, user },
        }) => {
            if (user) {
                redirect('/overview');
            }

            try {
                await MemberModel.signUp({
                    confirm_password,
                    display_name,
                    email,
                    password,
                });

                await $signIn('credentials', {
                    email,
                    password,
                    redirectTo: '/overview',
                });
            } catch (e) {
                if (e instanceof MongoServerError) {
                    if (e.code === 11000) {
                        returnValidationErrors(SignUpSchema, {
                            email: {
                                _errors: [t(i18n)`Email already exists`],
                            },
                        });
                    }
                }
                throw e;
            }
        },
    );
