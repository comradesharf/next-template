// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn: 'https://e522088c8a3bbf060522848a561c72d7@o4508124274360320.ingest.us.sentry.io/4508124276391936',
    release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 0.01,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
    ignoreTransactions: [/.+\/ping/],
    beforeSend(event, hint) {
        if (process.env.NODE_ENV !== 'production') {
            // console.error(hint.originalException || hint.syntheticException);
            return null;
        }
        return event;
    },
});
