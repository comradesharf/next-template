'use client';

import type * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cn } from '#libs/cn.ts';

const Drawer = ({
    shouldScaleBackground = true,
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
    <DrawerPrimitive.Root
        shouldScaleBackground={shouldScaleBackground}
        {...props}
    />
);
Drawer.displayName = 'Drawer';

const DrawerTrigger: React.ForwardRefExoticComponent<
    DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>
> = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose: React.ForwardRefExoticComponent<
    DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>
> = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
    HTMLDivElement,
    DialogPrimitive.DialogOverlayProps
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Overlay
        ref={ref}
        className={cn('fixed inset-0 z-50 bg-black/80', className)}
        {...props}
    />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
    HTMLDivElement,
    DialogPrimitive.DialogContentProps
>(({ className, children, ...props }, ref) => (
    <DrawerPortal>
        <DrawerOverlay />
        <DrawerPrimitive.Content
            ref={ref}
            className={cn(
                'bg-background fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border',
                className,
            )}
            {...props}
        >
            <div className="bg-muted mx-auto mt-4 h-2 w-[100px] rounded-full" />
            {children}
        </DrawerPrimitive.Content>
    </DrawerPortal>
));
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)}
        {...props}
    />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn('mt-auto flex flex-col gap-2 p-4', className)}
        {...props}
    />
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = React.forwardRef<
    HTMLHeadingElement,
    DialogPrimitive.DialogTitleProps
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Title
        ref={ref}
        className={cn(
            'text-lg font-semibold leading-none tracking-tight',
            className,
        )}
        {...props}
    />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
    HTMLParagraphElement,
    DialogPrimitive.DialogDescriptionProps
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Description
        ref={ref}
        className={cn('text-muted-foreground text-sm', className)}
        {...props}
    />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
};
