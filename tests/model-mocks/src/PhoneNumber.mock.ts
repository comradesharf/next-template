import type { PhoneNumber } from "app-models/models/PhoneNumberModel";
import type { FlattenMaps } from "mongoose";

export function generatePhoneNumber(): FlattenMaps<PhoneNumber> {
    return {
        country: {
            name: "Malaysia",
            iso2: "my",
            dialCode: "60",
            format: {
                default: "..-....-....",
            },
        },
        inputValue: "+60 13-3884-332",
        phone: "+60133884332",
    };
}

export const DefaultPhoneNumber = generatePhoneNumber();

export const InvalidPhoneNumber = {
    ...generatePhoneNumber(),
    inputValue: "+60 13",
    phone: "+6013",
};

export const TwilioPhoneNumber: FlattenMaps<PhoneNumber> = {
    phone: "+12345678900",
    inputValue: "+1 (234) 567-8900",
    country: {
        name: "United States",
        iso2: "us",
        dialCode: "1",
        format: {
            default: "(...) ...-....",
        },
        priority: 0,
    },
};
