import { ForbiddenError } from "@casl/ability";
import { accessibleBy } from "@casl/mongoose";
import { t } from "@lingui/core/macro";
import {
    PropType,
    type Ref,
    type ReturnModelType,
    index,
    modelOptions,
    prop,
} from "@typegoose/typegoose";
import {
    type FileUploadKeyPrefix,
    FileUploadKeyPrefixes,
} from "app-core/FileUploads";
import type { CompleteFileUpload } from "app-schemas/CompleteFileUploadSchema";
import type { FileUploadId } from "app-schemas/FileUploadIdSchema";
import type { GeneratePresignedPostUrl } from "app-schemas/GeneratePresignedPostUrlSchema";
import {
    type CreatePresignedPostParams,
    createPresignedPost,
    getObject,
} from "app-services/S3";
import { addSeconds } from "date-fns";
import { get, groupBy } from "lodash-es";
import { Types } from "mongoose";
import { Base } from "#Base.ts";
import { User } from "#User.ts";
import { getUser, getUserAbilities } from "#abilities.node.ts";
import type { Actions, Subjects } from "#abilities.ts";
import { NotFoundError } from "#errors.ts";
import { generateIdWithPrefix } from "#model-utils.ts";

declare module "@casl/ability" {
    interface RecordTypes {
        FileUpload: FileUpload;
    }
}

@modelOptions({
    options: {
        customName: "FileUpload",
    },
})
@index({ expiredAt: 1 }, { expireAfterSeconds: 0 })
class FileUpload extends Base {
    @prop({
        required: true,
        type: String,
        default: generateIdWithPrefix("fu"),
    })
    _id!: FileUploadId;

    @prop({ required: true, ref: () => User, type: String })
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

    @prop({
        required: true,
        type: String,
        enum: FileUploadKeyPrefixes,
    })
    keyPrefix!: FileUploadKeyPrefix;

    @prop({ type: Number })
    contentLengthInBytes!: number;

    @prop({
        type: Date,
        default: () => addSeconds(new Date(), 1_000),
    })
    expiredAt?: Date;

    static accessibleBy(
        this: ReturnModelType<typeof FileUpload>,
        action: Actions,
        abilities = getUserAbilities(),
    ) {
        return this.find(
            accessibleBy(abilities, action).ofType(
                this.modelName as Extract<Subjects, string>,
            ),
        );
    }

    static oneAccessibleBy(
        this: ReturnModelType<typeof FileUpload>,
        action: Actions,
        abilities = getUserAbilities(),
    ) {
        return this.findOne(
            accessibleBy(abilities, action).ofType(
                this.modelName as Extract<Subjects, string>,
            ),
        );
    }

    /**
     * Generates presigned post url for uploading files to S3
     *
     * @param data
     */
    static async generate(
        this: ReturnModelType<typeof FileUpload>,
        data: GeneratePresignedPostUrl,
    ) {
        const abilities = getUserAbilities();
        ForbiddenError.from(abilities)
            .setMessage(t`You are not allowed to upload files`)
            .throwUnlessCan("create", "FileUpload");

        const { user = [], literal = [] } = groupBy(
            Object.entries(data.meta),
            ([_, value]) => {
                if (value.startsWith("user:")) {
                    return "user";
                }
                return "literal";
            },
        );

        const $user = getUser();

        const userMeta = user.map(([key, value]) => [
            key,
            get($user, value.replace("user:", "")),
        ]);

        const doc = new this({
            user: $user,
            keyPrefix: data.keyPrefix,
            type: data.type,
            name: data.name,
        });

        const Fields: CreatePresignedPostParams["Fields"] = {
            "Content-Type": data.type,
            "X-Amz-Meta-Filename": data.name,
            ...Object.fromEntries(
                [...userMeta, ...literal].map(([key, value]) => [
                    `X-Amz-Meta-${key}`,
                    value,
                ]),
            ),
        };

        if ($user) {
            Fields["X-Amz-Meta-Uploader"] = $user._id;
        }

        const Conditions: CreatePresignedPostParams["Conditions"] = [
            ["eq", "$Content-Type", data.type],
            ["eq", "$X-Amz-Meta-Filename", data.name],
            ...[...userMeta, ...literal].map(
                ([key, value]) => ["eq", `$X-Amz-Meta-${key}`, value] as any,
            ),
        ];

        if ($user) {
            Conditions.push(["eq", "$X-Amz-Meta-Uploader", $user._id]);
        }

        const { url, fields } = await createPresignedPost({
            Key: `${data.keyPrefix}/${doc._id}`,
            Expires: 60 * 10,
            Fields,
            Conditions,
        });

        doc.url = url;
        doc.meta = new Types.Map(Object.entries(fields));

        return doc.save();
    }

    /**
     * Completes file upload by setting content length and removing expiration
     * @param data
     */
    static async complete(
        this: ReturnModelType<typeof FileUpload>,
        data: CompleteFileUpload,
    ) {
        const fileUpload = await this.oneAccessibleBy("create")
            .where("_id")
            .equals(data._id)
            .where("expiredAt")
            .exists(true)
            .orFail(() => new NotFoundError(t`File upload not found`));

        const abilities = getUserAbilities();
        ForbiddenError.from(abilities)
            .setMessage(t`You are not allowed to complete file uploads`)
            .throwUnlessCan("update", fileUpload);

        try {
            const output = await getObject({
                Key: `${fileUpload.keyPrefix}/${fileUpload._id}`,
            });

            fileUpload.contentLengthInBytes = output.ContentLength!;
            fileUpload.expiredAt = undefined;

            return await fileUpload.save();
        } catch (e) {
            if (e instanceof Error && e.name === "NoSuchKey") {
                throw new NotFoundError(t`File upload not found`);
            }
            throw e;
        }
    }
}

export { FileUpload };
