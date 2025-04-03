"use client";

import "client-only";
import { type PropsWithChildren, createContext, use } from "react";

export interface TimeZoneContext {
    timeZone: string;
}

export function withTimeZone<T>(
    _fn: () => T,
    _ctx: Partial<TimeZoneContext> = {},
): T {
    throw new Error("withTimezone is not available in the browser");
}

const Context = createContext<TimeZoneContext>(null as any);

export function Provider({
    timeZone = process.env.NEXT_PUBLIC_DEFAULT_USER_TZ!,
    children,
}: PropsWithChildren<Partial<TimeZoneContext>>) {
    return <Context.Provider value={{ timeZone }}>{children}</Context.Provider>;
}

export function useTimeZone() {
    return use(Context);
}
