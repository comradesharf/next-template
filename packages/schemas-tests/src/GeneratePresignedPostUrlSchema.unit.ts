import { DefaultFileUpload } from "app-models-mocks/FileUpload";
import { GeneratePresignedPostUrlSchema } from "app-schemas/GeneratePresignedPostUrlSchema";
import { expect, test } from "vitest";

test("should validate GeneratePresignedPostUrlSchema", () => {
    expect(
        GeneratePresignedPostUrlSchema.parse({
            keyPrefix: DefaultFileUpload.keyPrefix,
            type: DefaultFileUpload.type,
            name: DefaultFileUpload.name,
            meta: DefaultFileUpload.meta,
        }),
    ).toEqual({
        keyPrefix: DefaultFileUpload.keyPrefix,
        type: DefaultFileUpload.type,
        name: DefaultFileUpload.name,
        meta: DefaultFileUpload.meta,
    });
});
