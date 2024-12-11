import { PropType, modelOptions, prop } from "@typegoose/typegoose";
import type { Types } from "mongoose";

@modelOptions({
    options: {
        customName: "PhoneNumber",
    },
    schemaOptions: {
        _id: false,
    },
})
class Country {
    @prop({ required: true, type: String, trim: true })
    name!: string;

    @prop({ required: true, type: String, trim: true })
    iso2!: string;

    @prop({ required: true, type: String, trim: true })
    dialCode!: string;

    @prop({ type: Number })
    priority?: number;

    @prop({ type: [String] })
    areaCodes?: string[];

    @prop({ type: String, required: true }, PropType.MAP)
    format!: Types.Map<string>;
}

@modelOptions({
    options: {
        customName: "PhoneNumber",
    },
    schemaOptions: {
        _id: false,
    },
})
class PhoneNumber {
    @prop({ required: true, type: String, trim: true })
    phone!: string;

    @prop({ required: true, type: String, trim: true })
    inputValue!: string;

    @prop({ required: true, type: Country })
    country!: Country;
}

export { PhoneNumber };
