import { Trans } from "@lingui/macro";
import { Loader2 } from "lucide-react";
import { cn } from "#app/_libs/cn.ts";

export interface LoadingProps {
    className?: string;
}

export function Loading({ className }: LoadingProps) {
    return (
        <div className={cn("max-w-md text-center", className)}>
            <div className="text-center">
                <Loader2 className="mx-auto mb-4 h-16 w-16 animate-spin text-primary" />
                <h1 className="mb-2 font-semibold text-2xl text-foreground">
                    <Trans>Loading...</Trans>
                </h1>
                <p className="text-muted-foreground">
                    <Trans>Please wait while we prepare your content.</Trans>
                </p>
            </div>
        </div>
    );
}
