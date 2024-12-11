"use client";

import { composeEventHandlers } from "@radix-ui/primitive";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { signOut } from "#app/_actions/signOut.ts";

export interface SignOutButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}

export function SignOutButton({ asChild, ...props }: SignOutButtonProps) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            {...props}
            onClick={composeEventHandlers(props.onClick, () => signOut())}
        />
    );
}
