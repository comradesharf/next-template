import { DefaultPresignedPostUrl } from "app-model-mocks/PresignedPostUrl";
import { GeneratePresignedPostUrlSchema } from "app-schemas/GeneratePresignedPostUrlSchema";
import { expect, test } from "vitest";

test("should validate GeneratePresignedPostUrlSchema", () => {
    expect(
        GeneratePresignedPostUrlSchema.parse({
            keyPrefix: DefaultPresignedPostUrl.keyPrefix,
            type: DefaultPresignedPostUrl.type,
            name: DefaultPresignedPostUrl.name,
            meta: DefaultPresignedPostUrl.meta,
        }),
    ).toEqual({
        keyPrefix: DefaultPresignedPostUrl.keyPrefix,
        type: DefaultPresignedPostUrl.type,
        name: DefaultPresignedPostUrl.name,
        meta: DefaultPresignedPostUrl.meta,
    });
});
