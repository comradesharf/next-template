import * as Sentry from "@sentry/nextjs";

export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        await import("../sentry.server.config");

        const { connect, createCollections, syncIndexes } = await import(
            "app-models/db"
        );
        await connect();
        await createCollections();
        await syncIndexes();
    }

    if (process.env.NEXT_RUNTIME === "edge") {
        await import("../sentry.edge.config");
    }
}

export const onRequestError = Sentry.captureRequestError;
