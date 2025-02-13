"use client";

import {
    QueryClient,
    QueryClientProvider as TQueryClientProvider,
} from "@tanstack/react-query";
import { type PropsWithChildren, useState } from "react";

export interface QueryClientProviderProps extends PropsWithChildren {}

export function QueryClientProvider({ children }: QueryClientProviderProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60,
                    },
                },
            }),
    );

    return (
        <TQueryClientProvider client={queryClient}>
            {children}
        </TQueryClientProvider>
    );
}
