import { DefaultPhoneNumber } from "app-model-mocks/PhoneNumber";
import { PhoneNumberSchema } from "app-schemas/PhoneNumberSchema";
import { expect, test } from "vitest";

test("should validate PhoneNumberSchema", () => {
    expect(PhoneNumberSchema.parse(DefaultPhoneNumber)).toEqual(
        DefaultPhoneNumber,
    );
});
