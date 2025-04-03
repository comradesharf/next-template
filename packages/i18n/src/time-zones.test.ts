import { AsyncLocalStorage } from "node:async_hooks";
import type { PropsWithChildren } from "react";

export interface TimeZoneContext {
    timeZone: string;
}

const asl = new AsyncLocalStorage<TimeZoneContext>();

export function withTimeZone<T>(
    fn: () => T,
    ctx: Partial<TimeZoneContext> = {},
): T {
    return asl.run(
        { timeZone: ctx.timeZone ?? process.env.NEXT_PUBLIC_DEFAULT_USER_TZ! },
        fn,
    );
}

export function useTimeZone() {
    const ctx = asl.getStore();
    if (!ctx) {
        throw new Error("No timezone instance found in context");
    }
    return ctx;
}

export function Provider({ children }: PropsWithChildren<TimeZoneContext>) {
    console.warn("Provider is not available in the server");
    return children;
}
