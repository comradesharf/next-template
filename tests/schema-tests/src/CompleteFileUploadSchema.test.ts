import { DefaultPresignedPostUrl } from "app-model-mocks/PresignedPostUrl";
import { CompleteFileUploadSchema } from "app-schemas/CompleteFileUploadSchema";
import { expect, test } from "vitest";

test("should validate CompleteFileUploadSchema", () => {
    expect(
        CompleteFileUploadSchema.parse({
            _id: DefaultPresignedPostUrl._id,
        }),
    ).toEqual({
        _id: DefaultPresignedPostUrl._id,
    });
});
