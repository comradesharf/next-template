"use server";

import "server-only";
import { SignInError } from "@auth/core/errors";
import { SignInSchema } from "app-schemas/SignInSchema";
import { redirect } from "next/navigation";
import { signIn as $signIn } from "#app/_libs/auths/auths.ts";
import { I18nServerActionError } from "#app/_libs/errors.ts";
import { actionClient } from "#app/_libs/safe-actions.ts";

export const signIn = actionClient
    .metadata({
        actionName: "signIn",
        public: true,
    })
    .schema(SignInSchema)
    .action(async ({ parsedInput: { email, password }, ctx: { user } }) => {
        if (user) {
            redirect("/overview");
        }
        try {
            await $signIn("credentials", {
                email,
                password,
                type: "user",
                redirectTo: "/overview",
            });
        } catch (e) {
            if (e instanceof SignInError) {
                throw new I18nServerActionError(
                    {
                        code: "INVALID_CREDENTIALS",
                    },
                    e,
                );
            }
            throw e;
        }
    });
