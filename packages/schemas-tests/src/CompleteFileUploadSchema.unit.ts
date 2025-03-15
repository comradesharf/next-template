import { DefaultFileUpload } from "app-models-mocks/FileUpload";
import { CompleteFileUploadSchema } from "app-schemas/CompleteFileUploadSchema";
import { expect, test } from "vitest";

test("should validate CompleteFileUploadSchema", () => {
    expect(
        CompleteFileUploadSchema.parse({
            _id: DefaultFileUpload._id,
        }),
    ).toEqual({
        _id: DefaultFileUpload._id,
    });
});
