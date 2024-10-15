'use client';

import { Trans } from '@lingui/react';
import { type PropsWithChildren, createContext, useContext } from 'react';
import { Alert, AlertDescription } from '#app/_components/alert.tsx';
import { cn } from '#app/_libs/cn.ts';
import { type ErrorPayload, ServerActionError } from '#app/_libs/errors.ts';

const Context = createContext<{
    error?: ErrorPayload | null;
}>({});

export interface ServerErrorMessageProps {
    className?: string;
}

export const ServerErrorMessageProvider = Context.Provider;

export function ServerErrorMessage({
    className,
    children,
}: PropsWithChildren<ServerErrorMessageProps>) {
    const { error } = useContext(Context);

    if (!error) {
        return null;
    }

    return (
        <Alert variant="destructive" className={cn('mt-4', className)}>
            {children}
        </Alert>
    );
}

export interface ServerErrorMessageDescriptionProps {
    className?: string;
}

export function ServerErrorMessageDescription({
    className,
}: ServerErrorMessageDescriptionProps) {
    const { error } = useContext(Context);
    if (!error) {
        return null;
    }
    return (
        <AlertDescription className={className}>
            <Trans id={ServerActionError.getDefinedI18nMessage(error).id} />
        </AlertDescription>
    );
}
