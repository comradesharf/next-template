import { faker } from "@faker-js/faker";
import { FileUploadIdSchema } from "app-schemas/FileUploadIdSchema";
import { expect, test } from "vitest";

test("should validate FileUploadIdSchema", () => {
    const id = faker.string.alphanumeric({ casing: "lower", length: 24 });
    expect(FileUploadIdSchema.parse(`fu_${id}`)).toEqual(`fu_${id}`);
});
