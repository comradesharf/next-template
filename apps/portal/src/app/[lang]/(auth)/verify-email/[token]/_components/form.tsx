"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { VerifyEmailSchema } from "app-schemas/VerifyEmailSchema";
import type { PropsWithChildren } from "react";
import { verifyEmail } from "#app/_actions/verifyEmail.ts";
import { Form as SForm } from "#app/_components/form.tsx";
import { ServerErrorMessageProvider } from "#app/_components/server-error-message.tsx";

export interface FormProps extends PropsWithChildren {
    className?: string;
    session: string;
}

export function Form({ className, children, session }: FormProps) {
    const { form, handleSubmitWithAction, action } = useHookFormAction(
        verifyEmail.bind(null, session),
        zodResolver(VerifyEmailSchema),
    );
    const error = action.result?.serverError;

    return (
        <SForm {...form}>
            <form className={className} onSubmit={handleSubmitWithAction}>
                <ServerErrorMessageProvider value={{ error }}>
                    {children}
                </ServerErrorMessageProvider>
            </form>
        </SForm>
    );
}
