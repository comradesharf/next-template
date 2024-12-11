import { faker } from "@faker-js/faker";
import { PresignedPostUrlIdSchema } from "app-schemas/PresignedPostUrlIdSchema";
import { expect, test } from "vitest";

test("should validate PresignedPostUrlIdSchema", () => {
    const id = faker.string.alphanumeric({ casing: "lower", length: 24 });
    expect(PresignedPostUrlIdSchema.parse(`ppu_${id}`)).toEqual(`ppu_${id}`);
});
