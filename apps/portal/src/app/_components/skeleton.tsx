import type { HTMLAttributes } from "react";
import { cn } from "#app/_libs/cn.ts";

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-neutral-light-1",
                className,
            )}
            {...props}
        />
    );
}

export { Skeleton };
