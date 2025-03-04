"use client";
import { type PropsWithChildren, createContext, use } from "react";
import { Alert, AlertDescription } from "#app/_components/alert.tsx";
import { cn } from "#app/_libs/cn.ts";

const Context = createContext<{
    error?: { message: string } | null;
}>({});

export interface ServerErrorMessageProps {
    className?: string;
}

export const ServerErrorMessageProvider = Context;

export function ServerErrorMessage({
    className,
    children,
}: PropsWithChildren<ServerErrorMessageProps>) {
    const { error } = use(Context);

    if (!error) {
        return null;
    }

    return (
        <Alert variant="destructive" className={cn("mt-4", className)}>
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
    const { error } = use(Context);
    if (!error) {
        return null;
    }
    return (
        <AlertDescription className={className}>
            {error.message}
        </AlertDescription>
    );
}
