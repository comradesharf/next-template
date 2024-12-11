import { DefaultFileUpload } from "app-model-mocks/FileUpload";
import { FileUploadModel } from "app-models/models/FileUploadModel";
import { connection } from "mongoose";
import { expect, test } from "vitest";

test("should be able to create", async () => {
    await connection.transaction(async (session) => {
        const [fu] = await FileUploadModel.create([DefaultFileUpload], {
            session,
        });
        await expect(
            FileUploadModel.findById(fu._id).session(session).lean().orFail(),
        ).resolves.not.toThrow();
    });
});
