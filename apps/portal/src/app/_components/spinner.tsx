"use client";

import { useLingui } from "@lingui/react/macro";
import { MinusIcon, PlusIcon } from "lucide-react";
import { type InputHTMLAttributes, type Ref, useRef } from "react";
import { useMergeRefs } from "use-callback-ref";
import { useFormField } from "#app/_components/form.tsx";
import { cn } from "#app/_libs/cn.ts";

export interface SpinnerProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    ref?: Ref<HTMLInputElement>;
}

function Spinner({ className, ref, ...props }: SpinnerProps) {
    const nodeRef = useRef<HTMLInputElement | null>(null);

    const $ref = useMergeRefs([nodeRef, ref ?? null]);

    const { t } = useLingui();

    return (
        <div className={cn("flex flex-nowrap items-center", className)}>
            <button
                type="button"
                className="flex size-6 flex-none cursor-pointer items-center justify-center rounded-full border border-zinc-500 text-zinc-500 outline-hidden hover:border-zinc-800 hover:bg-zinc-50 hover:text-zinc-800 disabled:pointer-events-none disabled:text-opacity-75"
                aria-label={t`step down`}
                tabIndex={-1}
                onClick={() => {
                    nodeRef.current?.stepDown();
                    nodeRef.current?.dispatchEvent(
                        new Event("input", { bubbles: true }),
                    );
                    nodeRef.current?.dispatchEvent(
                        new Event("change", { bubbles: true }),
                    );
                }}
                disabled={props.disabled}
            >
                <MinusIcon className="size-4 text-foreground" />
            </button>
            <input
                {...props}
                ref={$ref}
                type="number"
                readOnly
                className="min-w-6 cursor-default appearance-none border-none bg-transparent text-center font-medium text-neutral-900 text-sm leading-none outline-hidden ring-0 [-moz-appearance:textfield] focus:ring-0 disabled:text-opacity-75 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
                type="button"
                className="flex size-6 flex-none cursor-pointer items-center justify-center rounded-full border border-zinc-500 text-zinc-500 outline-hidden hover:border-zinc-800 hover:bg-zinc-50 hover:text-zinc-800 disabled:pointer-events-none disabled:text-opacity-75"
                aria-label={t`step up`}
                tabIndex={-1}
                onClick={() => {
                    nodeRef.current?.stepUp();
                    nodeRef.current?.dispatchEvent(
                        new Event("input", { bubbles: true }),
                    );
                    nodeRef.current?.dispatchEvent(
                        new Event("change", { bubbles: true }),
                    );
                }}
                disabled={props.disabled}
            >
                <PlusIcon className="size-4 text-foreground" />
            </button>
        </div>
    );
}

export interface ControlledSpinnerProps extends SpinnerProps {}

function ControlledSpinner(props: ControlledSpinnerProps) {
    const { error, formItemId, formDescriptionId, formMessageId, controller } =
        useFormField();

    return (
        <Spinner
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

export { Spinner, ControlledSpinner };
