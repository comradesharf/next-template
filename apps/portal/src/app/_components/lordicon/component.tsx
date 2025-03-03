"use client";

import { Player } from "@lordicon/react";
import { useQuery } from "@tanstack/react-query";
import { type ComponentProps, useEffect, useRef } from "react";

export interface LordiconProps extends ComponentProps<typeof Player> {
    icon: "tool-oscillate" | "man-hover-glance" | "glasses-hover-searching";
    action: "play-from-beginning" | "pause";
    loop?: boolean;
    loopDelay?: number;
}

export default function Lordicon({
    icon,
    action,
    loop = true,
    loopDelay = 0,
    ...props
}: LordiconProps) {
    const { data } = useQuery({
        queryFn: ({ queryKey: [_, key] }) => {
            switch (key) {
                case "glasses-hover-searching":
                    return import("./glasses-hover-searching.json");
                case "man-hover-glance":
                    return import("./man-hover-glance.json");
                default:
                    return import("./tool-oscillate.json");
            }
        },
        queryKey: ["lordicon", icon],
        staleTime: Number.POSITIVE_INFINITY,
    });

    const ref = useRef<Player>(null);

    useEffect(() => {
        if (!ref.current || !data) {
            return;
        }
        switch (action) {
            case "pause":
                ref.current?.pause();
                return;
            case "play-from-beginning":
                ref.current?.playFromBeginning();
                return;
        }
    }, [action, data]);

    return (
        <Player
            {...props}
            ref={ref}
            icon={data ?? null}
            onComplete={() => {
                if (loop) {
                    setTimeout(() => {
                        ref.current?.playFromBeginning();
                    }, loopDelay);
                }
            }}
        />
    );
}
