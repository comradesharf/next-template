"use client";

import {
    type FieldValues,
    type UseFormStateProps,
    useFormState,
} from "react-hook-form";
import {
    ActionButton,
    type ActionButtonProps,
} from "#app/_components/action-button.tsx";

export interface SubmitButtonProps<TFieldValues extends FieldValues>
    extends Omit<ActionButtonProps, "name" | "loading">,
        UseFormStateProps<TFieldValues> {}

export function SubmitButton<TFieldValues extends FieldValues>({
    control,
    name,
    exact,
    children,
    type = "submit",
    ...props
}: SubmitButtonProps<TFieldValues>) {
    const { isSubmitting } = useFormState({
        control,
        name,
        exact,
        disabled: props.disabled,
    });
    return (
        <ActionButton {...props} loading={isSubmitting}>
            {children}
        </ActionButton>
    );
}
