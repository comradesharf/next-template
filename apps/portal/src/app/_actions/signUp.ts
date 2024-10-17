'use server';

import 'server-only';
import { MemberModel } from '@comradesharf/models/models/MemberModel';
import { SignUpSchema } from '@comradesharf/schemas/SignUpSchema';
import { MongoServerError } from 'mongodb';
import { returnValidationErrors } from 'next-safe-action';
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
            try {
                await MemberModel.signUp({
                    confirm_password,
                    display_name,
                    email,
                    password,
                });
            } catch (e) {
                if (e instanceof MongoServerError) {
                    if (e.code === 11000) {
                        returnValidationErrors(SignUpSchema, {
                            email: {
                                _errors: ['Email has been used'],
                            },
                        });
                    }
                }
                throw e;
            }
            redirect('/dashboard');
        },
    );
