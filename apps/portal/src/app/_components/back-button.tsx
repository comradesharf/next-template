"use client";

import { composeEventHandlers } from "@radix-ui/primitive";
import { useRouter } from "next/navigation";
import type { ComponentProps, Ref } from "react";
import { Button } from "#app/_components/button.tsx";

export interface BackButtonProps extends ComponentProps<typeof Button> {
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
