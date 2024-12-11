import { faker } from "@faker-js/faker";
import type { PresignedPostUrl } from "app-models/models/PresignedPostUrlModel";
import { generateIdWithPrefix } from "app-models/utils/generateId";
import { GeneratePresignedPostUrlSchema } from "app-schemas/GeneratePresignedPostUrlSchema";
import type { FlattenMaps } from "mongoose";

export function generatePresignedPostUrl(): FlattenMaps<PresignedPostUrl> {
    const _type = faker.system.mimeType();
    const name = faker.system.commonFileName();
    const uploader = generateIdWithPrefix("usr")();

    return {
        _id: generateIdWithPrefix("ppu")(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        __v: faker.number.int(),
        meta: {
            "Content-Type": _type,
            "X-Amz-Meta-Uploader": uploader,
            "X-Amz-Meta-Filename": name,
            [`X-Amz-Meta-${faker.lorem.word(1)}`]: faker.lorem.word(),
        },
        keyPrefix: faker.helpers.arrayElement(
            GeneratePresignedPostUrlSchema.shape.keyPrefix.options,
        ),
        url: faker.internet.url(),
        user: uploader,
        type: _type,
        name,
    };
}

export const DefaultPresignedPostUrl = generatePresignedPostUrl();
