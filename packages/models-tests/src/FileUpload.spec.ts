import { faker } from "@faker-js/faker";
import { DefaultAdmin } from "app-models-mocks/Admin";
import { DefaultFileUpload } from "app-models-mocks/FileUpload";
import { withUserAbilities } from "app-models/abilities.node";
import { transaction } from "app-models/db";
import { FileUploadModel } from "app-models/models";
import { describe, expect, test } from "vitest";

describe("FileUploadModel", () => {
    test("should be able to create", async () => {
        await transaction(async () => {
            const [fu] = await FileUploadModel.create([DefaultFileUpload]);
            await expect(
                FileUploadModel.findById(fu._id).lean().orFail(),
            ).resolves.not.toThrow();
        });
    });

    test("should be able to upload file", async () => {
        await transaction(async () => {
            await withUserAbilities(async () => {
                const meta = {
                    animal: faker.animal.bear(),
                    color: faker.color.human(),
                    "user-display-name": "user:displayName",
                };

                const before = await FileUploadModel.generate({
                    keyPrefix: DefaultFileUpload.keyPrefix,
                    type: DefaultFileUpload.type,
                    name: DefaultFileUpload.name,
                    meta,
                });

                expect(before.toJSON()).toMatchObject({
                    keyPrefix: DefaultFileUpload.keyPrefix,
                    type: DefaultFileUpload.type,
                    name: DefaultFileUpload.name,
                    meta: expect.objectContaining({
                        "X-Amz-Meta-animal": meta.animal,
                        "X-Amz-Meta-color": meta.color,
                        "X-Amz-Meta-user-display-name":
                            DefaultAdmin.displayName,
                    }),
                    user: DefaultAdmin._id,
                    expiredAt: expect.any(Date),
                });

                const formData = new FormData();
                [...before.meta.entries()].forEach(([key, value]) => {
                    formData.append(key, value);
                });
                formData.append("file", new File([], DefaultFileUpload.name));

                const response = await fetch(before.url, {
                    body: formData,
                    method: "POST",
                });

                expect(response.ok).toBe(true);
                await response.text();

                const after = await FileUploadModel.complete(before);

                const leanAfter = after.toJSON();
                expect(leanAfter).toMatchObject({
                    _id: before._id,
                    keyPrefix: DefaultFileUpload.keyPrefix,
                    type: DefaultFileUpload.type,
                    name: DefaultFileUpload.name,
                    meta: expect.objectContaining({
                        "X-Amz-Meta-animal": meta.animal,
                        "X-Amz-Meta-color": meta.color,
                        "X-Amz-Meta-user-display-name":
                            DefaultAdmin.displayName,
                    }),
                    user: DefaultAdmin._id,
                });

                expect(leanAfter).not.toMatchObject({
                    expiredAt: expect.any(Date),
                });
            }, DefaultAdmin);
        });
    });
});
