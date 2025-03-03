import { Trans } from "@lingui/react/macro";
import * as Platforms from "app-core/Platforms";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "#app/_components/button.tsx";
import { cn } from "#app/_libs/cn.ts";

export interface NotFoundProps {
    className?: string;
}

export function NotFound({ className }: NotFoundProps) {
    return (
        <div className={cn("w-full max-w-md px-4", className)}>
            <div className="mb-8 text-center">
                <h1 className="mb-4 font-extrabold text-5xl text-gray-700 md:text-9xl dark:text-gray-300">
                    404
                </h1>
                <p className="mb-2 font-semibold text-2xl">
                    <Trans>Oops! Page not found</Trans>
                </p>
                <p className="mb-8 text-gray-600 dark:text-gray-400">
                    <Trans>
                        The page you are looking for might have been removed,
                        had its name changed, or is temporarily unavailable.
                    </Trans>
                </p>
            </div>
            <div className="space-y-4">
                <div className="text-center">
                    <Button
                        asChild
                        variant="outline"
                        className="inline-flex items-center"
                    >
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            <Trans>Back to Homepage</Trans>
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="mt-12 text-center text-gray-500 text-sm dark:text-gray-400">
                <p>
                    <Trans>
                        If you think this is a mistake, please{" "}
                        <a
                            href={Platforms.MailtoSupportEmail}
                            className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                            contact our support team
                        </a>
                        .
                    </Trans>
                </p>
            </div>
        </div>
    );
}
