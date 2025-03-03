import { EventEmitter } from "node:events";
import * as Sentry from "@sentry/nextjs";
import { Log } from "app-core/Log";

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
export interface SystemEvents {}

class SystemEventEmitter extends EventEmitter<SystemEvents> {
    constructor() {
        super({
            captureRejections: true,
        });
        /**
         * Set the maximum number of listeners unlimited. We know that our implementation won't cause a memory leak
         */
        this.setMaxListeners(Number.POSITIVE_INFINITY);
        Log.info("SystemEventEmitter initialized");
    }

    [Symbol.for("nodejs.rejection")](
        error: Error,
        event: string,
        ...args: any[]
    ) {
        Log.error({
            from: "SystemEventEmitter",
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

const instance = new SystemEventEmitter();

export function emit<K extends keyof SystemEvents>(
    eventName: K,
    ...args: SystemEvents[K]
) {
    return instance.emit(eventName, ...args);
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
function on<K extends keyof SystemEvents>(
    eventName: K,
    fn: (...args: SystemEvents[K]) => unknown,
) {
    // @ts-expect-error
    instance.on(eventName, fn);
}
