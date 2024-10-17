import { Trans } from '@lingui/macro';
import { Loader2 } from 'lucide-react';
import { cn } from '#app/_libs/cn.ts';

export interface LoadingProps {
    className?: string;
}

export function Loading({ className }: LoadingProps) {
    return (
        <div
            className={cn(
                'max-w-md text-center -translate-x-1/2 left-1/2 absolute translate-y-1/2 min-h-[50vh]',
                className,
            )}
        >
            <div className="text-center">
                <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
                <h1 className="text-2xl font-semibold text-foreground mb-2">
                    <Trans>Loading...</Trans>
                </h1>
                <p className="text-muted-foreground">
                    <Trans>Please wait while we prepare your content.</Trans>
                </p>
            </div>
        </div>
    );
}
