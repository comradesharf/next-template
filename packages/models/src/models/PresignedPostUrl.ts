import { ForbiddenError } from "@casl/ability";
import { accessibleBy } from "@casl/mongoose";
import {
    PropType,
    type Ref,
    type ReturnModelType,
    modelOptions,
    prop,
} from "@typegoose/typegoose";
import { Log } from "app-core/Log";
import type { CompleteFileUpload } from "app-schemas/CompleteFileUploadSchema";
import type { GeneratePresignedPostUrl } from "app-schemas/GeneratePresignedPostUrlSchema";
import type { PresignedPostUrlId } from "app-schemas/PresignedPostUrlIdSchema";
import { createPresignedPost, getObject } from "app-services/S3";
import { get, groupBy } from "lodash-es";
import { type HydratedDocument, Types } from "mongoose";
import { Base } from "#models/Base.ts";
import { FileUploadModel } from "#models/FileUploadModel.ts";
import { User } from "#models/User.ts";
import type { Abilities, Actions } from "#utils/abilities.ts";
import { getAbilities } from "#utils/abilitiesContext.ts";
import { ServerError } from "#utils/errors.ts";
import { generateIdWithPrefix } from "#utils/generateId.ts";

declare module "@casl/ability" {
    interface RecordTypes {
        PresignedPostUrl: PresignedPostUrl;
    }
}

const log = Log.child({
    Model: "PresignedPostUrl",
});

@modelOptions({
    options: {
        customName: "PresignedPostUrl",
    },
})
class PresignedPostUrl extends Base {
    @prop({
        required: true,
        type: String,
        default: generateIdWithPrefix("ppu"),
    })
    _id!: PresignedPostUrlId;

    @prop({ required: true, type: String, ref: () => User })
    user!: Ref<User, string>;

    @prop({ required: true, trim: true, type: String })
    url!: string;

    @prop({ required: true, trim: true, type: String })
    type!: string;

    @prop({ required: true, trim: true, type: String })
    name!: string;

    @prop(
        {
            required: true,
            type: String,
            default: () => {},
        },
        PropType.MAP,
    )
    meta!: Types.Map<string>;

    @prop({ required: true, trim: true, type: String })
    keyPrefix!: string;

    /**
     * Generates presigned post url for uploading files to S3
     *
     * @param data
     */
    static async generate(
        this: ReturnModelType<typeof PresignedPostUrl>,
        data: GeneratePresignedPostUrl & {
            uploader: HydratedDocument<User>;
        },
    ) {
        const abilities = getAbilities();

        if (abilities) {
            ForbiddenError.from(abilities).throwUnlessCan(
                "create",
                "PresignedPostUrl",
            );
        }

        const { user = [], literal = [] } = groupBy(
            Object.entries(data.meta),
            ([_, value]) => {
                if (value.startsWith("user:")) {
                    return "user";
                }
                return "literal";
            },
        );

        const userMeta = user.map(([key, value]) => [
            key,
            get(data.uploader, value.replace("user:", "")),
        ]);

        const doc = new this({
            user: data.uploader,
            keyPrefix: data.keyPrefix,
            type: data.type,
            name: data.name,
        });

        const { url, fields } = await createPresignedPost({
            Key: `${data.keyPrefix}/${doc._id}`,
            Expires: 60 * 10,
            Fields: {
                "Content-Type": data.type,
                "X-Amz-Meta-Uploader": data.uploader._id,
                "X-Amz-Meta-Filename": data.name,
                ...Object.fromEntries(
                    [...userMeta, ...literal].map(([key, value]) => [
                        `X-Amz-Meta-${key}`,
                        value,
                    ]),
                ),
            },
            Conditions: [
                ["eq", "$Content-Type", data.type],
                ["eq", "$X-Amz-Meta-Uploader", data.uploader._id],
                ["eq", "$X-Amz-Meta-Filename", data.name],
                ...[...userMeta, ...literal].map(
                    ([key, value]) =>
                        ["eq", `$X-Amz-Meta-${key}`, value] as any,
                ),
            ],
        });

        doc.url = url;
        doc.meta = new Types.Map(Object.entries(fields));

        return doc.save();
    }

    static async complete(
        this: ReturnModelType<typeof PresignedPostUrl>,
        data: CompleteFileUpload,
    ) {
        const presignedPostUrl = await this.oneAccessibleBy("create")
            .where("_id")
            .equals(data._id)
            .lean()
            .orFail();

        try {
            const output = await getObject({
                Key: `${presignedPostUrl.keyPrefix}/${presignedPostUrl._id}`,
            });

            const fileUpload = new FileUploadModel({
                keyPrefix: presignedPostUrl.keyPrefix,
                user: presignedPostUrl.user,
                name: presignedPostUrl.name,
                type: presignedPostUrl.type,
                contentLengthInBytes: output.ContentLength,
                url: presignedPostUrl.url,
                meta: presignedPostUrl.meta,
            });

            return await fileUpload.save();
        } catch (e) {
            if (e instanceof Error && e.name === "NoSuchKey") {
                throw new ServerError({
                    code: "NOT_FOUND",
                    data: {
                        type: "PresignedPostUrl",
                    },
                });
            }
            throw e;
        }
    }

    static accessibleBy(
        this: ReturnModelType<typeof PresignedPostUrl>,
        action: Actions,
        abilities: Abilities | null | undefined = getAbilities(),
    ) {
        if (!abilities) {
            return this.find();
        }

        return this.find(
            accessibleBy(abilities, action).ofType("PresignedPostUrl"),
        );
    }

    static oneAccessibleBy(
        this: ReturnModelType<typeof PresignedPostUrl>,
        action: Actions,
        abilities: Abilities | null | undefined = getAbilities(),
    ) {
        if (!abilities) {
            return this.findOne();
        }

        return this.findOne(
            accessibleBy(abilities, action).ofType("PresignedPostUrl"),
        );
    }
}

export { PresignedPostUrl };
