import type { StructPlace } from "app-models/models";
import type { FlattenMaps } from "mongoose";
import { type Overwrites, maybe } from "#utils.ts";

export function generatePlace({
    addressComponents = [
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
    _id = "ChIJ04Oy_WlOzDERJDvXT0ff9UQ",
    formattedAddress = "Lapangan Terbang Sultan Abdul Aziz Shah, 47200 Subang, Selangor, Malaysia",
    location = {
        lat: 3.1332448,
        lng: 101.5537971,
    },
    types = ["airport", "point_of_interest", "establishment"],
    viewport = {
        south: 3.1319200697084986,
        west: 101.55248856970849,
        north: 3.1346180302915023,
        east: 101.5551865302915,
    },
    displayName,
    googleMapsURI,
    plusCode,
    point,
    primaryType,
}: Overwrites<StructPlace.Place> = {}): FlattenMaps<StructPlace.Place> {
    const place: FlattenMaps<StructPlace.Place> = {
        addressComponents,
        _id,
        formattedAddress,
        location,
        types,
        viewport,
        point: point ?? {
            type: "Point",
            coordinates: [location.lat, location.lng],
        },
    };

    maybe(
        (value) => {
            place.displayName = value;
        },
        displayName,
        "Subang Airport - Arrival | Sky Park Domestic Flights Lapangan Terbang",
    );

    maybe(
        (value) => {
            place.plusCode = value;
        },
        plusCode,
        {
            compoundCode: "4HM3+7G Subang, Selangor",
            globalCode: "6PM34HM3+7G",
        },
    );

    maybe(
        (value) => {
            place.primaryType = value;
        },
        primaryType,
        "airport",
    );

    maybe(
        (value) => {
            place.googleMapsURI = value;
        },
        googleMapsURI,
        "https://maps.google.com/?cid=4969123261248387876&hl=en&gl=MY&source=apiv3",
    );

    return place;
}

export const DefaultPlace = generatePlace();

export const PetalingJayaPlace1 = generatePlace({
    _id: "ChIJ-eLbtt1OzDERwLDzenC8pIg",
    addressComponents: [
        { longText: "27", shortText: "27", types: ["street_number"] },
        {
            longText: "Jalan PJU 3/15",
            shortText: "Jalan PJU 3/15",
            types: ["route"],
        },
        {
            longText: "Tropicana Indah",
            shortText: "Tropicana Indah",
            types: ["political", "sublocality", "sublocality_level_1"],
        },
        {
            longText: "Petaling Jaya",
            shortText: "PJ",
            types: ["locality", "political"],
        },
        {
            longText: "Selangor",
            shortText: "Selangor",
            types: ["administrative_area_level_1", "political"],
        },
        {
            longText: "Malaysia",
            shortText: "MY",
            types: ["country", "political"],
        },
        { longText: "47410", shortText: "47410", types: ["postal_code"] },
    ],
    formattedAddress:
        "27, Jalan PJU 3/15, Tropicana Indah, 47410 Petaling Jaya, Selangor, Malaysia",
    location: { lat: 3.146198, lng: 101.5953599 },
    types: ["premise"],
    viewport: {
        east: 101.5967088302915,
        north: 3.147544830291502,
        south: 3.144846869708498,
        west: 101.5940108697085,
    },
});

export const PetalingJayaPlace2 = generatePlace({
    _id: "ChIJ6eTsxytPzDERW07hq6W8cBA",
    addressComponents: [
        {
            longText: "IPC Shopping Centre",
            shortText: "IPC",
            types: ["premise"],
        },
        { longText: "2", shortText: "2", types: ["street_number"] },
        {
            longText: "Jalan PJU 7/2",
            shortText: "Jalan PJU 7/2",
            types: ["route"],
        },
        {
            longText: "Mutiara Damansara",
            shortText: "Mutiara Damansara",
            types: ["political", "sublocality", "sublocality_level_1"],
        },
        {
            longText: "Petaling Jaya",
            shortText: "PJ",
            types: ["locality", "political"],
        },
        {
            longText: "Selangor",
            shortText: "Selangor",
            types: ["administrative_area_level_1", "political"],
        },
        {
            longText: "Malaysia",
            shortText: "MY",
            types: ["country", "political"],
        },
        { longText: "47800", shortText: "47800", types: ["postal_code"] },
    ],
    formattedAddress:
        "Ladies parking, Level P1, IPC Shopping Centre, 2, Jalan PJU 7/2, Mutiara Damansara, 47800 Petaling Jaya, Selangor, Malaysia",
    location: { lat: 3.155711, lng: 101.6107282 },
    plusCode: {
        compoundCode: "5J46+77 Petaling Jaya, Selangor, Malaysia",
        globalCode: "6PM35J46+77",
    },
    types: ["establishment", "point_of_interest"],
    viewport: {
        east: 101.6120771802915,
        north: 3.157059980291502,
        south: 3.154362019708498,
        west: 101.6093792197085,
    },
});

export const PetalingJayaPlace3 = generatePlace({
    _id: "ChIJS3bFHcxOzDER80732vDIXCc",
    addressComponents: [
        {
            longText: "3",
            shortText: "3",
            types: ["street_number"],
        },
        {
            longText: "Lebuh Bandar Utama",
            shortText: "Lebuh Bandar Utama",
            types: ["route"],
        },
        {
            longText: "Bandar Utama",
            shortText: "Bandar Utama",
            types: ["sublocality_level_1", "sublocality", "political"],
        },
        {
            longText: "Petaling Jaya",
            shortText: "PJ",
            types: ["locality", "political"],
        },
        {
            longText: "Selangor",
            shortText: "Selangor",
            types: ["administrative_area_level_1", "political"],
        },
        {
            longText: "Malaysia",
            shortText: "MY",
            types: ["country", "political"],
        },
        {
            longText: "47800",
            shortText: "47800",
            types: ["postal_code"],
        },
    ],
    displayName: "Centrepoint Bandar Utama",
    formattedAddress:
        "3, Lebuh Bandar Utama, Bandar Utama, 47800 Petaling Jaya, Selangor",
    location: {
        lat: 3.137466,
        lng: 101.609805,
    },
    plusCode: {
        compoundCode: "4JP5+XW Petaling Jaya, Selangor",
        globalCode: "6PM34JP5+XW",
    },
    primaryType: "shopping_mall",
    googleMapsURI:
        "https://maps.google.com/?cid=2836362802127916787&hl=en&gl=MY&source=apiv3",
    types: ["shopping_mall", "point_of_interest", "establishment"],
    viewport: {
        east: 101.61117493029151,
        north: 3.1390797302915017,
        south: 3.136381769708498,
        west: 101.60847696970849,
    },
});

export const KualaLumpurPlace1 = generatePlace({
    _id: "ChIJm1EIWx01zDERxrth90qvHkQ",
    addressComponents: [
        {
            longText: "Level 3",
            shortText: "Level 3",
            types: ["subpremise"],
        },
        {
            longText: "Jalan Manis 6",
            shortText: "Jalan Manis 6",
            types: ["route"],
        },
        {
            longText: "Taman Bukit Segar",
            shortText: "Taman Bukit Segar",
            types: ["sublocality_level_1", "sublocality", "political"],
        },
        {
            longText: "Kuala Lumpur",
            shortText: "Kuala Lumpur",
            types: ["locality", "political"],
        },
        {
            longText: "Wilayah Persekutuan Kuala Lumpur",
            shortText: "Wilayah Persekutuan Kuala Lumpur",
            types: ["administrative_area_level_1", "political"],
        },
        {
            longText: "Malaysia",
            shortText: "MY",
            types: ["country", "political"],
        },
        {
            longText: "56100",
            shortText: "56100",
            types: ["postal_code"],
        },
    ],
    displayName: "Cheras LeisureMall",
    formattedAddress:
        "Level 3, Jalan Manis 6, Taman Bukit Segar, 56100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
    location: {
        lat: 3.0909294,
        lng: 101.74313169999999,
    },
    plusCode: {
        compoundCode: "3PRV+97 Kuala Lumpur, Federal Territory of Kuala Lumpur",
        globalCode: "6PM33PRV+97",
    },
    primaryType: "shopping_mall",
    googleMapsURI:
        "https://maps.google.com/?cid=4908553380393237446&hl=en&gl=MY&source=apiv3",
    types: ["shopping_mall", "point_of_interest", "establishment"],
    viewport: {
        east: 101.7444618802915,
        north: 3.092144780291502,
        south: 3.089446819708498,
        west: 101.74176391970849,
    },
});

export const KualaLumpurPlace2 = generatePlace({
    _id: "ChIJQyguwK41zDERImQvNoDevks",
    addressComponents: [
        { longText: "Jalan 3/144a", shortText: "Jln 3/144a", types: ["route"] },
        {
            longText: "Taman Len Seng",
            shortText: "Taman Len Seng",
            types: ["sublocality_level_1", "sublocality", "political"],
        },
        {
            longText: "Kuala Lumpur",
            shortText: "Kuala Lumpur",
            types: ["locality", "political"],
        },
        {
            longText: "Wilayah Persekutuan Kuala Lumpur",
            shortText: "Wilayah Persekutuan Kuala Lumpur",
            types: ["administrative_area_level_1", "political"],
        },
        {
            longText: "Malaysia",
            shortText: "MY",
            types: ["country", "political"],
        },
        { longText: "56000", shortText: "56000", types: ["postal_code"] },
    ],
    displayName: "Cheras Sentral Mall",
    formattedAddress:
        "Jln 3/144a, Taman Len Seng, 56000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
    location: { lat: 3.0787772, lng: 101.7447049 },
    plusCode: {
        compoundCode: "3PHV+GV Kuala Lumpur, Federal Territory of Kuala Lumpur",
        globalCode: "6PM33PHV+GV",
    },
    primaryType: "shopping_mall",
    googleMapsURI:
        "https://maps.google.com/?cid=5458044440665875490&hl=en&gl=MY&source=apiv3",
    types: ["shopping_mall", "point_of_interest", "establishment"],
    viewport: {
        east: 101.7461466802915,
        north: 3.0797024302915017,
        south: 3.077004469708498,
        west: 101.7434487197085,
    },
});
