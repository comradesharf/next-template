import { Trans } from '@lingui/react';
import { type PropsWithChildren, createContext, useContext } from 'react';
import { Alert, AlertDescription } from '#app/_components/alert.tsx';
import { cn } from '#app/_libs/cn.ts';
import { type ErrorPayload, ServerActionError } from '#app/_libs/errors.ts';

const Context = createContext<{
    error: ErrorPayload;
}>({} as any);

export interface ServerErrorMessageProps {
    className?: string;
    action: {
        result?: {
            serverError?: ErrorPayload;
        };
    };
}

export function ServerErrorMessage({
    className,
    action,
    children,
}: PropsWithChildren<ServerErrorMessageProps>) {
    const error = action.result?.serverError;

    if (!error) {
        return null;
    }

    return (
        <Context.Provider
            value={{
                error,
            }}
        >
            <Alert variant="destructive" className={cn('mt-4', className)}>
                {children}
            </Alert>
        </Context.Provider>
    );
}

export interface ServerErrorMessageDescriptionProps {
    className?: string;
}

export function ServerErrorMessageDescription({
    className,
}: ServerErrorMessageDescriptionProps) {
    const { error } = useContext(Context);
    return (
        <AlertDescription className={className}>
            <Trans id={ServerActionError.getDefinedI18nMessage(error).id} />
        </AlertDescription>
    );
}
