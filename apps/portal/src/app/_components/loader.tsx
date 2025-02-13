"use client";

import type { TargetAndTransition } from "framer-motion";
import * as m from "framer-motion/m";

export interface LoaderProps {
    className?: string;
}

export function Loader({ className }: LoaderProps) {
    return (
        <m.svg
            width="70"
            height="50"
            viewBox="0 0 63 33"
            stroke="hsl(var(--primary))"
            className={className}
            fill="hsl(var(--primary))"
            strokeWidth={1.5}
        >
            <title>Brand</title>
            <m.path
                d="M21.3032 5.31045L40.1061 33L62.0413 13.189H56.8025V0H24.1882L26.5695 3.51278H53.2947V16.3533L40.7472 27.6987L21.9443 0L0 19.8202H5.2388V33H37.7798L35.3894 29.4872H8.7466V16.6467L21.3032 5.31045Z"
                animate={draw}
            />
        </m.svg>
    );
}

const draw: TargetAndTransition = {
    rotateY: [0, -25, 0, 25, 0, -25],
    rotateX: [0, 25, 0, 25, 0, -25],
    transition: {
        type: "tween",
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
    },
};
