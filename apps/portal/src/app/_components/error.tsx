'use client';

import { Trans } from '@lingui/macro';
import * as Sentry from '@sentry/nextjs';
import { ArrowLeft, TriangleAlert } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '#app/_components/button.tsx';
import { cn } from '#libs/cn.ts';

export interface ErrorProps {
    className?: string;
    error: Error & { digest?: string };
}

export function ErrorComp({ className, error }: ErrorProps) {
    useEffect(() => {
        Sentry.captureException(error);
    }, [error]);

    return (
        <div className={cn('max-w-md text-center', className)}>
            <TriangleAlert className="mx-auto mb-8 w-32 h-32 text-muted-foreground" />
            <h1 className="text-4xl font-bold mb-4">
                <Trans>Oops! Something went wrong</Trans>
            </h1>
            <p className="text-xl mb-8">
                <Trans>
                    We're sorry, but it seems like we've encountered an
                    unexpected error. Our team has been notified and is working
                    on fixing it.
                </Trans>
            </p>
            <Button asChild className="inline-flex items-center">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <Trans>Return to Home</Trans>
                </Link>
            </Button>
        </div>
    );
}
