import * as Sentry from "@sentry/node";

// Ensure to call this before importing any other modules!
Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 0.01,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
    tracePropagationTargets: [/^\//, /.+\.mindset\.swiss/],
    beforeSend(event) {
        if (process.env.NODE_ENV !== "production") {
            return null;
        }
        return event;
    },
});
