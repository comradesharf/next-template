'use client';

import { SignUpSchema } from '@comradesharf/schemas/SignUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import type { PropsWithChildren } from 'react';
import { signUp } from '#app/_actions/signUp.ts';
import { Form as SForm } from '#app/_components/form.tsx';
import { ServerErrorMessageProvider } from '#app/_components/server-error-message.tsx';

export interface FormProps extends PropsWithChildren {
    className?: string;
}

export function Form({ className, children }: FormProps) {
    const { form, handleSubmitWithAction, action } = useHookFormAction(
        signUp,
        zodResolver(SignUpSchema),
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
