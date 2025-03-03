"use client";

import { composeEventHandlers } from "@radix-ui/primitive";
import { useAction } from "next-safe-action/hooks";
import { type PropsWithChildren, createContext, use } from "react";
import {
    ActionButton,
    type ActionButtonProps,
} from "#app/_components/action-button.tsx";
import { ServerErrorMessageProvider } from "#app/_components/server-error-message.tsx";

const Context = createContext<{
    context: {
        execute: (...args: any[]) => void;
        hasSucceeded: boolean;
        hasErrored: boolean;
        isPending: boolean;
    };
    // @ts-expect-error
}>({});

export interface SimpleActionProps<F extends (...args: any[]) => Promise<any>>
    extends PropsWithChildren {
    action: F;
}

export function SimpleAction<F extends (...args: any[]) => Promise<any>>({
    action,
    children,
}: SimpleActionProps<F>) {
    const context = useAction(action);

    const validationErrorMessage =
        // @ts-expect-error
        context.result.bindArgsValidationErrors?.[0]?._errors?.[0];

    return (
        <Context
            value={{
                context,
            }}
        >
            <ServerErrorMessageProvider
                value={{
                    // @ts-expect-error
                    error:
                        context.result.serverError ??
                        (validationErrorMessage
                            ? {
                                  message: validationErrorMessage,
                              }
                            : undefined),
                }}
            >
                {children}
            </ServerErrorMessageProvider>
        </Context>
    );
}

export function SimpleActionTrigger(props: Omit<ActionButtonProps, "loading">) {
    const { context } = use(Context);
    const onClick = composeEventHandlers(props.onClick, () => {
        context.execute();
    });
    return (
        <ActionButton
            {...props}
            loading={context.isPending}
            onClick={onClick}
        />
    );
}
