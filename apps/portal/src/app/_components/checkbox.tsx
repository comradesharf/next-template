"use client";

import { composeEventHandlers } from "@radix-ui/primitive";
import { useFormField } from "#app/_components/form.tsx";
import { cn } from "#app/_libs/cn.ts";

import type { CheckedState } from "@radix-ui/react-checkbox";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { SquareIcon } from "lucide-react";
import { type ComponentProps, useCallback } from "react";

function Checkbox({
    className,
    ref,
    ...props
}: ComponentProps<typeof CheckboxPrimitive.Root>) {
    return (
        <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
                "peer aspect-square h-4 w-4 shrink-0 rounded-sm border border-neutral-light-1 bg-neutral-light-0 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
                className,
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                className={cn("flex items-center justify-center text-current")}
            >
                <SquareIcon className="size-2/5" fill="white" stroke="white" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

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
