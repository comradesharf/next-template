import { faker } from "@faker-js/faker";
import type { Place } from "app-models/models/PlaceModel";
import type { FlattenMaps } from "mongoose";

export function generatePlace(): FlattenMaps<Place> {
    const place: FlattenMaps<Place> = {
        addressComponents: [
            {
                longText: "Malaysia",
                shortText: "MY",
                types: ["country", "political"],
            },
            {
                longText: "Lapangan Terbang Sultan Abdul Aziz Shah",
                shortText: "Lapangan Terbang Sultan Abdul Aziz Shah",
                types: ["sublocality_level_1", "sublocality", "political"],
            },
            {
                longText: "Subang",
                shortText: "Subang",
                types: ["locality", "political"],
            },
            {
                longText: "Selangor",
                shortText: "Selangor",
                types: ["administrative_area_level_1", "political"],
            },
            {
                longText: "47200",
                shortText: "47200",
                types: ["postal_code"],
            },
        ],
        _id: "ChIJ04Oy_WlOzDERJDvXT0ff9UQ",
        formattedAddress:
            "Lapangan Terbang Sultan Abdul Aziz Shah, 47200 Subang, Selangor, Malaysia",
        location: {
            lat: 3.1332448,
            lng: 101.5537971,
        },
        types: ["airport", "point_of_interest", "establishment"],
        viewport: {
            south: 3.1319200697084986,
            west: 101.55248856970849,
            north: 3.1346180302915023,
            east: 101.5551865302915,
        },
    };

    faker.helpers.maybe(() => {
        place.displayName =
            "Subang Airport - Arrival | Sky Park Domestic Flights Lapangan Terbang";
    });

    faker.helpers.maybe(() => {
        place.plusCode = {
            compoundCode: "4HM3+7G Subang, Selangor",
            globalCode: "6PM34HM3+7G",
        };
    });

    faker.helpers.maybe(() => {
        place.primaryType = "airport";
    });

    faker.helpers.maybe(() => {
        place.googleMapsURI =
            "https://maps.google.com/?cid=4969123261248387876&hl=en&gl=MY&source=apiv3";
    });

    return place;
}

export const DefaultPlace = generatePlace();
