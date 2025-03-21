"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { DotIcon } from "lucide-react";
import * as React from "react";
import { useFormField } from "#app/_components/form.tsx";
import { cn } from "#app/_libs/cn.ts";

const InputOTP = React.forwardRef<
    React.ElementRef<typeof OTPInput>,
    React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
    <OTPInput
        ref={ref}
        containerClassName={cn(
            "flex items-center gap-2 has-disabled:opacity-50",
            containerClassName,
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
    />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
    return (
        <div
            ref={ref}
            data-active={isActive}
            className={cn(
                "relative flex h-9 w-9 items-center justify-center border-input border-y border-r text-sm shadow-xs transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-1 data-[active=true]:ring-ring ",
                className,
            )}
            {...props}
        >
            {char}
            {hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
                </div>
            )}
        </div>
    );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
    <div
        ref={ref}
        // biome-ignore lint/a11y/useSemanticElements: This is a separator and does not need to be a semantic element
        role="separator"
        tabIndex={-1}
        {...props}
    >
        <DotIcon />
    </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

function ControlledInputOTP(
    props: Extract<
        React.ComponentProps<typeof OTPInput>,
        { children: React.ReactNode }
    >,
) {
    const { controller } = useFormField();
    return <InputOTP {...props} {...controller.field} />;
}

export {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
    ControlledInputOTP,
};
