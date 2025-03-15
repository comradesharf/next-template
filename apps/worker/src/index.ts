import "#instrument.ts";
import * as Sentry from "@sentry/node";
import { Log } from "app-core/Log";
import { start } from "#start.ts";

start().catch((err) => {
    Log.error({
        err,
    });
    Sentry.captureException(err);
});
