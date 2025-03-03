"use client";

import { composeEventHandlers } from "@radix-ui/primitive";
import { useFormField } from "#app/_components/form.tsx";
import { toggleVariants } from "#app/_components/toggle.tsx";
import { cn } from "#app/_libs/cn.ts";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { type ComponentProps, use } from "react";

const ToggleGroupContext = React.createContext<
    VariantProps<typeof toggleVariants>
>({
    size: "default",
    variant: "default",
});

function ToggleGroup({
    className,
    variant,
    size,
    children,
    ref,
    ...props
}: ComponentProps<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>) {
    return (
        <ToggleGroupPrimitive.Root
            ref={ref}
            className={cn("flex items-center justify-center gap-1", className)}
            {...props}
        >
            <ToggleGroupContext value={{ variant, size }}>
                {children}
            </ToggleGroupContext>
        </ToggleGroupPrimitive.Root>
    );
}

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

function ToggleGroupItem({
    className,
    children,
    variant,
    size,
    ref,
    ...props
}: ComponentProps<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>) {
    const context = use(ToggleGroupContext);

    return (
        <ToggleGroupPrimitive.Item
            ref={ref}
            className={cn(
                toggleVariants({
                    variant: context.variant || variant,
                    size: context.size || size,
                }),
                className,
            )}
            {...props}
        >
            {children}
        </ToggleGroupPrimitive.Item>
    );
}

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export type ControlledToggleGroupProps = React.ComponentPropsWithoutRef<
    typeof ToggleGroupPrimitive.Root
> &
    VariantProps<typeof toggleVariants>;

function ControlledToggleGroup(props: ControlledToggleGroupProps) {
    const { controller } = useFormField();

    return (
        // @ts-expect-error
        <ToggleGroup
            {...props}
            disabled={controller.field.disabled || props.disabled}
            value={controller.field.value}
            onValueChange={composeEventHandlers(
                controller.field.onChange,
                // @ts-expect-error
                props.onValueChange,
            )}
        />
    );
}

export { ToggleGroup, ToggleGroupItem, ControlledToggleGroup };
