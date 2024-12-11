import { faker } from "@faker-js/faker";
import { DefaultAdmin } from "app-model-mocks/Admin";
import { DefaultPresignedPostUrl } from "app-model-mocks/PresignedPostUrl";
import { PresignedPostUrlModel } from "app-models/models/PresignedPostUrlModel";
import { withAbilities } from "app-models/utils/abilitiesContext";
import { connection } from "mongoose";
import { expect, test } from "vitest";

test("should be able to create", async () => {
    await connection.transaction(async (session) => {
        const [ppu] = await PresignedPostUrlModel.create(
            [DefaultPresignedPostUrl],
            { session },
        );
        await expect(
            PresignedPostUrlModel.findById(ppu._id)
                .session(session)
                .lean()
                .orFail(),
        ).resolves.not.toThrow();
    });
});

test("should be able to upload file", async () => {
    await connection.transaction(async () => {
        await withAbilities(async () => {
            const meta = {
                animal: faker.animal.bear(),
                color: faker.color.human(),
                "user-display-name": "user:displayName",
            };

            const ppu = await PresignedPostUrlModel.generate({
                keyPrefix: DefaultPresignedPostUrl.keyPrefix as any,
                type: DefaultPresignedPostUrl.type,
                name: DefaultPresignedPostUrl.name,
                meta,
                uploader: DefaultAdmin as any,
            });

            expect(ppu.toJSON()).toMatchObject({
                keyPrefix: DefaultPresignedPostUrl.keyPrefix,
                type: DefaultPresignedPostUrl.type,
                name: DefaultPresignedPostUrl.name,
                meta: expect.objectContaining({
                    "X-Amz-Meta-animal": meta.animal,
                    "X-Amz-Meta-color": meta.color,
                    "X-Amz-Meta-user-display-name": DefaultAdmin.displayName,
                }),
                user: DefaultAdmin._id,
            });

            const formData = new FormData();
            [...ppu.meta.entries()].forEach(([key, value]) => {
                formData.append(key, value);
            });
            formData.append("file", new File([], DefaultPresignedPostUrl.name));

            const response = await fetch(ppu.url, {
                body: formData,
                method: "POST",
            });

            expect(response.ok).toBe(true);

            const fileUpload = await PresignedPostUrlModel.complete(ppu);
            expect(fileUpload.toJSON()).toMatchObject({
                keyPrefix: DefaultPresignedPostUrl.keyPrefix,
                type: DefaultPresignedPostUrl.type,
                name: DefaultPresignedPostUrl.name,
                meta: expect.objectContaining({
                    "X-Amz-Meta-animal": meta.animal,
                    "X-Amz-Meta-color": meta.color,
                    "X-Amz-Meta-user-display-name": DefaultAdmin.displayName,
                }),
                user: DefaultAdmin._id,
            });
        }, DefaultAdmin);
    });
});
