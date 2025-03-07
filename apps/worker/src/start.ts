import { EventEmitter } from "node:events";
import * as Sentry from "@sentry/nextjs";
import { Log } from "app-core/Log";
import { connect } from "app-models/db";
import { DelayedMessageModel } from "app-models/models";

class MessageEventEmitter extends EventEmitter {
    constructor() {
        super({
            captureRejections: true,
        });
        /**
         * Set the maximum number of listeners unlimited. We know that our implementation won't cause a memory leak
         */
        this.setMaxListeners(Number.POSITIVE_INFINITY);
        Log.info("MessageEventEmitter initialized");
    }

    async [Symbol.for("nodejs.rejection")](
        error: Error,
        event: string,
        ...args: any[]
    ) {
        Log.error({
            from: "MessageEventEmitter",
            err: error,
            event,
            args,
        });

        Sentry.captureException(error, (ctx) => {
            return ctx.setExtras({
                event,
                args,
            });
        });
    }
}

const emitter = new MessageEventEmitter();

export async function start() {
    Log.info("starting worker");

    await connect();
    Log.info("connected to the database");

    const controller = new AbortController();

    process.on("SIGINT", () => {
        Log.info("stopping worker");
        controller.abort();
    });

    while (!controller.signal.aborted) {
        try {
            for await (const message of DelayedMessageModel.iterate({
                signal: controller.signal,
            })) {
                Log.info({
                    msg: "received message",
                    event: message.type,
                    payload: message,
                });
                emitter.emit(message.type, message);
            }
        } catch (e: any) {
            if (e.name === "AbortError") {
                break;
            }

            Log.error({
                msg: "Failed to process message, retrying...",
                err: e,
            });

            Sentry.captureException(e);
        }
    }

    Log.error({
        msg: "worker stopped",
        err: controller.signal.reason,
        aborted: controller.signal.aborted,
    });

    process.exit(controller.signal.reason ? 1 : 0);
}
