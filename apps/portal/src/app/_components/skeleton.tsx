import type { HTMLAttributes } from 'react';
import { cn } from '#app/_libs/cn.ts';

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('bg-primary/10 animate-pulse rounded-md', className)}
            {...props}
        />
    );
}

export { Skeleton };
