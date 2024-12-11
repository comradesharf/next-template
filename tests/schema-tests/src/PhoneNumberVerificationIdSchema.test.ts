import { faker } from "@faker-js/faker";
import { PhoneNumberVerificationIdSchema } from "app-schemas/PhoneNumberVerificationIdSchema";
import { expect, test } from "vitest";

test("should validate PhoneNumberVerificationIdSchema", () => {
    const id = faker.string.alphanumeric({ casing: "lower", length: 24 });
    expect(PhoneNumberVerificationIdSchema.parse(`pnv_${id}`)).toEqual(
        `pnv_${id}`,
    );
});
