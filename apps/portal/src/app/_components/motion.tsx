"use client";

import { LazyMotion } from "framer-motion";
import * as m from "framer-motion/m";
import { Fragment, type PropsWithChildren, useMemo } from "react";
import { cn } from "#app/_libs/cn.ts";

const loadFeatures = () =>
    import("framer-motion").then((res) => res.domAnimation);

export function MotionProvider({ children }: PropsWithChildren) {
    return (
        <LazyMotion features={loadFeatures} strict>
            {children}
        </LazyMotion>
    );
}

export interface TextAlternatingSlideInProps {
    text: string;
    className?: string;
}

export function TextAlternatingSlideIn({
    className,
    text,
    ...rest
}: TextAlternatingSlideInProps) {
    const nodes = useMemo(() => {
        const words = text.split(/\s+/);

        return words.map((word, index) => (
            <Fragment key={index + word}>
                <m.span
                    className="inline-block"
                    variants={{
                        initial: {
                            y: "100%",
                            opacity: 0,
                        },
                        animate: {
                            y: 0,
                            opacity: 1,
                        },
                    }}
                >
                    {word}
                </m.span>
                <m.span
                    className={cn("inline-block", {
                        hidden: index === words.length - 1,
                    })}
                    variants={{
                        initial: {
                            y: "100%",
                            opacity: 0,
                        },
                        animate: {
                            y: 0,
                            opacity: 1,
                        },
                    }}
                >
                    &nbsp;
                </m.span>
            </Fragment>
        ));
    }, [text]);
    return (
        <m.span
            {...rest}
            className={cn("relative block overflow-hidden", className)}
            initial="initial"
            animate="animate"
            transition={{
                staggerChildren: 0.02,
            }}
        >
            {nodes}
        </m.span>
    );
}

export interface SlideInGroupProps extends PropsWithChildren {
    className?: string;
    staggerChildren?: number;
}

export function SlideInGroup({
    className,
    children,
    staggerChildren = 0.2,
}: SlideInGroupProps) {
    return (
        <m.div
            className={className}
            initial="initial"
            animate="animate"
            transition={{
                staggerChildren,
            }}
        >
            {children}
        </m.div>
    );
}

export interface SlideInItemProps extends PropsWithChildren {
    className?: string;
    direction?: "up" | "down";
}

export function SlideInItem({
    className,
    children,
    direction = "down",
}: SlideInItemProps) {
    return (
        <m.div
            className={className}
            variants={{
                initial: {
                    y: direction === "down" ? -20 : 20,
                    opacity: 0,
                },
                animate: {
                    y: 0,
                    opacity: 1,
                },
            }}
            exit={{
                y: direction === "down" ? -20 : 20,
                opacity: 0,
            }}
        >
            {children}
        </m.div>
    );
}
