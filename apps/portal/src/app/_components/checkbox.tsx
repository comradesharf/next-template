"use client";

import { composeEventHandlers } from "@radix-ui/primitive";
import type { CheckedState } from "@radix-ui/react-checkbox";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { useFormField } from "#app/_components/form.tsx";
import { cn } from "#app/_libs/cn.ts";

import type * as React from "react";
import { type ComponentProps, useCallback } from "react";

function Checkbox({
    className,
    ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
    return (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            className={cn(
                "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs outline-none transition-shadow focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:data-[state=checked]:bg-primary dark:aria-invalid:ring-destructive/40",
                className,
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                data-slot="checkbox-indicator"
                className="flex items-center justify-center text-current transition-none"
            >
                <CheckIcon className="size-3.5" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}

function ControlledCheckbox({
    value,
    ...props
}: ComponentProps<typeof Checkbox>) {
    const { error, formItemId, formDescriptionId, formMessageId, controller } =
        useFormField();
    const field = controller.field;

    const handleCheckedChange = useCallback(
        (checked: CheckedState) => {
            return checked
                ? field.onChange([...field.value, value])
                : field.onChange(
                      field.value?.filter(($value: any) => $value !== value),
                  );
        },
        [field, value],
    );

    return (
        <Checkbox
            {...props}
            {...controller.field}
            id={formItemId}
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            checked={field.value?.includes(value)}
            onCheckedChange={composeEventHandlers(
                props.onCheckedChange,
                handleCheckedChange,
            )}
        />
    );
}

export { Checkbox, ControlledCheckbox };
