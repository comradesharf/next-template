"use client";

import type * as React from "react";
import type { Ref } from "react";
import { useFormField } from "#app/_components/form.tsx";
import { cn } from "#app/_libs/cn.ts";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    ref?: Ref<HTMLInputElement>;
}

function Input({ className, type, ref, ...props }: InputProps) {
    return (
        <input
            type={type}
            className={cn(
                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base ring-offset-2 transition-colors file:border-0 file:bg-transparent file:font-medium file:text-base file:text-foreground placeholder:text-muted-foreground/30 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                className,
            )}
            ref={ref}
            {...props}
        />
    );
}
Input.displayName = "Input";

function ControlledInput(props: InputProps) {
    const { error, formItemId, formDescriptionId, formMessageId, controller } =
        useFormField();

    return (
        <Input
            {...props}
            {...controller.field}
            id={formItemId}
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
        />
    );
}

export { Input, ControlledInput };
