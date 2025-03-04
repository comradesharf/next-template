"use client";

import * as ToastPrimitives from "@radix-ui/react-toast";
import { type VariantProps, cva } from "class-variance-authority";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "#app/_libs/cn.ts";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = ({
    className,
    ref,
    ...props
}: React.ComponentProps<typeof ToastPrimitives.Viewport>) => (
    <ToastPrimitives.Viewport
        ref={ref}
        className={cn(
            "fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]",
            className,
        )}
        {...props}
    />
);
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full sm:data-[state=open]:slide-in-from-bottom-full",
    {
        variants: {
            variant: {
                default: "border bg-background text-foreground",
                destructive:
                    "destructive group border-destructive bg-destructive text-destructive-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

const Toast = ({
    className,
    variant,
    ref,
    ...props
}: React.ComponentProps<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>) => {
    return (
        <ToastPrimitives.Root
            ref={ref}
            className={cn(toastVariants({ variant }), className)}
            {...props}
        />
    );
};
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = ({
    className,
    ref,
    ...props
}: React.ComponentProps<typeof ToastPrimitives.Action>) => (
    <ToastPrimitives.Action
        ref={ref}
        className={cn(
            "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 font-medium text-sm transition-colors hover:bg-secondary focus:outline-hidden focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 focus:group-[.destructive]:ring-destructive hover:group-[.destructive]:border-destructive/30 hover:group-[.destructive]:bg-destructive hover:group-[.destructive]:text-destructive-foreground",
            className,
        )}
        {...props}
    />
);
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = ({
    className,
    ref,
    ...props
}: React.ComponentProps<typeof ToastPrimitives.Close>) => (
    <ToastPrimitives.Close
        ref={ref}
        className={cn(
            "absolute top-1 right-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-hidden focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 focus:group-[.destructive]:ring-red-400 focus:group-[.destructive]:ring-offset-red-600 hover:group-[.destructive]:text-red-50",
            className,
        )}
        toast-close=""
        {...props}
    >
        <XIcon className="h-4 w-4" />
    </ToastPrimitives.Close>
);
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = ({
    className,
    ref,
    ...props
}: React.ComponentProps<typeof ToastPrimitives.Title>) => (
    <ToastPrimitives.Title
        ref={ref}
        className={cn("font-semibold text-sm [&+div]:text-xs", className)}
        {...props}
    />
);
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = ({
    className,
    ref,
    ...props
}: React.ComponentProps<typeof ToastPrimitives.Description>) => (
    <ToastPrimitives.Description
        ref={ref}
        className={cn("text-sm opacity-90", className)}
        {...props}
    />
);
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
    type ToastProps,
    type ToastActionElement,
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
    ToastAction,
};
