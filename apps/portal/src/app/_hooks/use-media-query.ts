"use client";

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string) {
    return useSyncExternalStore(
        (listener) => {
            const mediaQueryList = window.matchMedia(query);
            const controller = new AbortController();
            mediaQueryList.addEventListener("change", listener, {
                signal: controller.signal,
            });
            return () => {
                controller.abort();
            };
        },
        () => window.matchMedia(query).matches,
        () => false,
    );
}
