import { PropType, modelOptions, pre, prop } from "@typegoose/typegoose";

/**
 * @immutable
 */
@modelOptions({
    schemaOptions: {
        _id: false,
    },
    options: {
        customName: "LatLngLiteral",
    },
})
class LatLngLiteral implements google.maps.LatLngLiteral {
    @prop({ type: Number, required: true, immutable: true })
    lat!: number;

    @prop({ type: Number, required: true, immutable: true })
    lng!: number;
}

/**
 * @immutable
 */
@modelOptions({
    schemaOptions: {
        _id: false,
    },
    options: {
        customName: "PlusCode",
    },
})
class PlusCode implements Partial<google.maps.places.PlusCode> {
    @prop({ type: String, immutable: true })
    compoundCode?: string | null;

    @prop({ type: String, immutable: true })
    globalCode?: string | null;
}

/**
 * @immutable
 */
@modelOptions({
    schemaOptions: {
        _id: false,
    },
    options: {
        customName: "AddressComponent",
    },
})
class AddressComponent implements google.maps.places.AddressComponent {
    @prop({ type: String, required: true, immutable: true })
    longText!: string;

    @prop({ type: String, required: true, immutable: true })
    shortText!: string;

    @prop({ type: [String], required: true, immutable: true }, PropType.ARRAY)
    types!: string[];
}

@modelOptions({
    schemaOptions: {
        _id: false,
    },
    options: {
        customName: "LatLngBoundsLiteral",
    },
})
class LatLngBoundsLiteral implements google.maps.LatLngBoundsLiteral {
    @prop({ type: Number, required: true, immutable: true })
    east!: number;

    @prop({ type: Number, required: true, immutable: true })
    north!: number;

    @prop({ type: Number, required: true, immutable: true })
    south!: number;

    @prop({ type: Number, required: true, immutable: true })
    west!: number;
}

@modelOptions({
    schemaOptions: {
        _id: false,
    },
    options: {
        customName: "GeoJSONPoint",
    },
})
class GeoJSONPoint {
    @prop({ type: String, required: true, enum: ["Point"], default: "Point" })
    type!: "Point";

    @prop({ type: [Number], required: true, _id: false }, PropType.ARRAY)
    coordinates!: [lng: number, lat: number];
}

@modelOptions({
    options: {
        customName: "Place",
    },
    schemaOptions: {
        _id: false,
    },
})
@pre<Place>("save", function (this: Place) {
    this.point = {
        type: "Point",
        coordinates: [this.location.lat, this.location.lng],
    };
})
class Place {
    @prop({
        required: true,
        type: String,
    })
    _id!: string;

    @prop(
        { type: () => [AddressComponent], required: true, immutable: true },
        PropType.ARRAY,
    )
    addressComponents!: AddressComponent[];

    @prop({ type: String, immutable: true })
    displayName?: string;

    @prop({ type: String, required: true, immutable: true })
    formattedAddress!: string;

    @prop({ type: LatLngLiteral, required: true, immutable: true })
    location!: LatLngLiteral;

    @prop({ type: PlusCode, immutable: true })
    plusCode?: PlusCode;

    @prop({ type: String, immutable: true })
    primaryType?: string;

    @prop({ type: String, immutable: true })
    googleMapsURI?: string;

    @prop({ type: [String], immutable: true }, PropType.ARRAY)
    types!: string[];

    @prop({ type: LatLngBoundsLiteral, required: true, immutable: true })
    viewport!: LatLngBoundsLiteral;

    @prop({
        type: GeoJSONPoint,
        required: true,
    })
    point!: GeoJSONPoint;
}

export {
    Place,
    LatLngLiteral,
    PlusCode,
    AddressComponent,
    LatLngBoundsLiteral,
    GeoJSONPoint,
};
