"use client";

import type { MotionProps, Variants } from "framer-motion";
import * as m from "framer-motion/m";
import type { PropsWithChildren } from "react";
import type { ButtonProps } from "#app/_components/button.tsx";
import { Lordicon } from "#app/_components/lordicon.tsx";
import { MotionButton } from "#app/_components/motion-button.tsx";
import { cn } from "#app/_libs/cn.ts";

export interface ActionButtonProps
    extends PropsWithChildren<Omit<ButtonProps, keyof MotionProps>> {
    loading?: boolean;
}

export function ActionButton({
    children,
    loading,
    className,
    ...props
}: ActionButtonProps) {
    return (
        <MotionButton
            {...props}
            className={cn(
                "shrink-0 grow-0 origin-center cursor-pointer overflow-hidden disabled:opacity-100",
                className,
            )}
            disabled={loading}
            initial="initial"
            animate={loading ? ["loading", "roll"] : "idle"}
        >
            <m.span className="absolute" variants={$Variants.indicator}>
                <Lordicon
                    action={loading ? "play-from-beginning" : "pause"}
                    icon="tool-oscillate"
                    size={34}
                />
            </m.span>
            <m.span variants={$Variants.children}>{children}</m.span>
        </MotionButton>
    );
}

const $Variants = {
    indicator: {
        loading: {
            x: 0,
            transition: {
                ease: "easeInOut",
            },
        },
        idle: { x: "-350%" },
        initial: { x: "-350%" },
    },
    children: {
        loading: {
            x: "350%",
            transition: {
                ease: "easeInOut",
            },
        },
        idle: { x: 0 },
    },
} satisfies Record<string, Variants>;
