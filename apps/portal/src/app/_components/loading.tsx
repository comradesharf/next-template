import { Trans } from "@lingui/react/macro";
import { Loader } from "#app/_components/loader.tsx";
import { cn } from "#app/_libs/cn.ts";

export interface LoadingProps {
    className?: string;
    title?: string;
    description?: string;
}

export function Loading({ className, title, description }: LoadingProps) {
    return (
        <div className={cn("max-w-md text-center", className)}>
            <div className="text-center">
                <Loader className="mx-auto mb-4 size-24" />
                <h1 className="mb-2 font-semibold text-2xl text-foreground">
                    {title ? title : <Trans>Loading</Trans>}
                </h1>
                <p className="text-muted-foreground">
                    {description ? (
                        description
                    ) : (
                        <Trans>
                            Please wait while we prepare your content.
                        </Trans>
                    )}
                </p>
            </div>
        </div>
    );
}
