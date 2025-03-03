"use client";

import Image, { type ImageProps } from "next/image";

export type MapStaticImageProps = Omit<
    ImageProps,
    "height" | "src" | "loader"
> & {
    lat: number;
    lng: number;
    height: number;
    region?: string;
    language?: string;
    zoom?: number;
    maptype?: "roadmap" | "satellite" | "terrain" | "hybrid";
};

export function MapStaticImage({
    lng,
    lat,
    height,
    language = "en",
    region = "MY",
    zoom,
    maptype = "roadmap",
    ...props
}: MapStaticImageProps) {
    return (
        <Image
            {...props}
            src={`${lat},${lng}`}
            alt={props.alt || ""}
            height={props.fill ? undefined : height}
            loader={({ width, src }) => {
                const url = new URL(
                    "https://maps.googleapis.com/maps/api/staticmap",
                );
                url.searchParams.set(
                    "key",
                    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
                );
                url.searchParams.set("size", `${width}x${height}`);
                url.searchParams.set(
                    "markers",
                    `color:0x5A218B|label:A|${src}`,
                );
                url.searchParams.set("language", language);
                url.searchParams.set("region", region);
                if (zoom) {
                    url.searchParams.set("zoom", zoom.toString(10));
                }
                url.searchParams.set("scale", `${width > 700 ? 2 : 1}`);
                url.searchParams.set("maptype", maptype);
                return url.toString();
            }}
        />
    );
}
