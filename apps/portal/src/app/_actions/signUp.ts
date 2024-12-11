"use server";

import "server-only";
import { t } from "@lingui/macro";
import type { SignUpSession } from "app-models/models/SignUpSession";
import { SignUpSessionModel } from "app-models/models/SignUpSessionModel";
import { SignUpSchema } from "app-schemas/SignUpSchema";
import { MongoServerError } from "mongodb";
import { type FlattenMaps, connection } from "mongoose";
import { returnValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";
import { actionClient } from "#app/_libs/safe-actions.ts";

export const signUp = actionClient
    .metadata({
        actionName: "signUp",
        public: true,
    })
    .schema(SignUpSchema)
    .action(
        async ({
            parsedInput: { confirm_password, display_name, email, password },
            ctx: { lang, i18n },
        }) => {
            try {
                let session: FlattenMaps<SignUpSession>;
                await connection.transaction(async ($session) => {
                    session = await SignUpSessionModel.signUp(
                        {
                            confirm_password,
                            display_name,
                            email,
                            password,
                            lang,
                            role: "MEMBER",
                        },
                        {
                            session: $session,
                        },
                    );
                });
                redirect(`/verify-email/${session!._id}`);
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
