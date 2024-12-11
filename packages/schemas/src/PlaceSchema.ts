import { z } from "zod";

export const PlaceSchema = z.object({
    addressComponents: z.array(
        z.object({
            longText: z.string(),
            shortText: z.string(),
            types: z.array(z.string()),
        }),
    ),
    displayName: z.string().optional(),
    formattedAddress: z.string(),
    _id: z.string(),
    location: z.object({
        lat: z.number(),
        lng: z.number(),
    }),
    plusCode: z
        .object({
            compoundCode: z.string().optional(),
            globalCode: z.string().optional(),
        })
        .optional(),
    primaryType: z.string().optional(),
    types: z.array(z.string()),
    viewport: z.object({
        south: z.number(),
        west: z.number(),
        north: z.number(),
        east: z.number(),
    }),
    googleMapsURI: z.string().optional(),
});

export type Place = z.infer<typeof PlaceSchema>;
