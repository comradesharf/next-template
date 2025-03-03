"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "#app/_libs/cn.ts";

const toggleVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground cursor-pointer",
    {
        variants: {
            variant: {
                default: "bg-transparent",
                outline:
                    "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
            },
            size: {
                default: "h-9 px-3",
                sm: "h-8 px-2",
                lg: "h-10 px-3",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

function Toggle({
    className,
    variant,
    size,
    ref,
    ...props
}: ComponentProps<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>) {
    return (
        <TogglePrimitive.Root
            ref={ref}
            className={cn(toggleVariants({ variant, size, className }))}
            {...props}
        />
    );
}

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
