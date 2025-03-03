"use client";

import { composeEventHandlers } from "@radix-ui/primitive";
import { useRouter } from "next/navigation";
import type { Ref } from "react";
import { Button, type ButtonProps } from "#app/_components/button.tsx";

export interface BackButtonProps extends ButtonProps {
    ref?: Ref<HTMLButtonElement>;
}

export function BackButton(props: BackButtonProps) {
    const router = useRouter();

    return (
        <Button
            {...props}
            type={props.type ?? "button"}
            onClick={composeEventHandlers(props.onClick, () => {
                router.back();
            })}
        />
    );
}
