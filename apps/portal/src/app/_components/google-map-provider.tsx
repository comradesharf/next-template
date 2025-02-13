"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import type { PropsWithChildren } from "react";

export interface GoogleMapProviderProps extends PropsWithChildren {}

export function GoogleMapProvider({ children }: GoogleMapProviderProps) {
    return (
        <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            region="MY"
            language="en"
            libraries={["places", "maps"]}
        >
            {children}
        </APIProvider>
    );
}
