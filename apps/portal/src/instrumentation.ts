import * as Sentry from '@sentry/nextjs';

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        await import('../sentry.server.config');

        const { db } = await import('@comradesharf/models/utils/db');
        await db();

        const { connection } = await import('mongoose');
        await connection.createCollections();
        await connection.syncIndexes();
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
        await import('../sentry.edge.config');
    }
}

export const onRequestError = Sentry.captureRequestError;
