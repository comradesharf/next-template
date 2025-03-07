import { faker } from "@faker-js/faker";
import { AdminIdSchema } from "app-schemas/AdminIdSchema";
import { expect, test } from "vitest";

test("should validate AdminIdSchema", () => {
    const id = faker.string.alphanumeric({ casing: "lower", length: 24 });
    expect(AdminIdSchema.parse(`adm_${id}`)).toEqual(`adm_${id}`);
});
