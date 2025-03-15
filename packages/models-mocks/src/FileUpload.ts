import { faker } from "@faker-js/faker";
import { FileUploadKeyPrefixes } from "app-core/FileUploads";
import { generateIdWithPrefix } from "app-models/model-utils";
import type { StructFileUpload } from "app-models/models";
import type { FlattenMaps } from "mongoose";
import { type Overwrites, maybe } from "#utils.ts";

export function generateFileUpload({
    _id = generateIdWithPrefix("fu")(),
    createdAt = faker.date.past(),
    updatedAt = faker.date.past(),
    __v = faker.number.int(),
    meta = {},
    keyPrefix = faker.helpers.arrayElement(FileUploadKeyPrefixes),
    url = faker.internet.url(),
    user = generateIdWithPrefix("usr")(),
    type = faker.system.mimeType(),
    contentLengthInBytes = faker.number.int(),
    name = faker.system.commonFileName(),
    expiredAt,
}: Overwrites<StructFileUpload.FileUpload> = {}): FlattenMaps<StructFileUpload.FileUpload> {
    const doc: FlattenMaps<StructFileUpload.FileUpload> = {
        _id,
        createdAt,
        updatedAt,
        __v,
        meta: {
            "Content-Type": type,
            "X-Amz-Meta-Uploader": user as string,
            "X-Amz-Meta-Filename": name,
            ...meta,
        },
        keyPrefix,
        url,
        user: user,
        type: type,
        name,
        contentLengthInBytes,
    };

    maybe(
        (value) => {
            doc.expiredAt = value;
        },
        expiredAt,
        faker.date.future,
    );

    return doc;
}

export const DefaultFileUpload = generateFileUpload();
