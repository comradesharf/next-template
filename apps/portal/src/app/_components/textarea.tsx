"use client";

import { useFormField } from "#app/_components/form.tsx";
import { cn } from "#app/_libs/cn.ts";

import type * as React from "react";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    ref?: React.Ref<HTMLTextAreaElement>;
}

const Textarea = ({ className, ref, ...props }: TextareaProps) => {
    return (
        <textarea
            className={cn(
                "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                className,
            )}
            ref={ref}
            {...props}
        />
    );
};
Textarea.displayName = "Textarea";

function ControlledTextarea(props: TextareaProps) {
    const { controller } = useFormField();
    return (
        <Textarea
            {...props}
            value={controller.field.value}
            onChange={controller.field.onChange}
        />
    );
}

export { Textarea, ControlledTextarea };
