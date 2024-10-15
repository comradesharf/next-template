import { Platforms } from '@comradesharf/core/Platforms';
import { Trans } from '@lingui/macro';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '#app/_components/button.tsx';
import { cn } from '#app/_libs/cn.ts';

export interface NotFoundProps {
    className?: string;
}

export function NotFound({ className }: NotFoundProps) {
    return (
        <div
            className={cn(
                'max-w-md w-full px-4 -translate-x-1/2 left-1/2 absolute translate-y-1/2',
                className,
            )}
        >
            <div className="text-center mb-8">
                <h1 className="text-9xl font-extrabold text-gray-700 dark:text-gray-300 mb-4">
                    404
                </h1>
                <p className="text-2xl font-semibold mb-2">
                    <Trans>Oops! Page not found</Trans>
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
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
            <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>
                    <Trans>
                        If you think this is a mistake, please{' '}
                        <a
                            href={Platforms.MailtoSupportEmail}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
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
