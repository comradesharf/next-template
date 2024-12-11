import { accessibleBy } from "@casl/mongoose";
import {
    PropType,
    type Ref,
    type ReturnModelType,
    modelOptions,
    prop,
} from "@typegoose/typegoose";
import { Log } from "app-core/Log";
import type { FileUploadId } from "app-schemas/FileUploadIdSchema";
import type { Types } from "mongoose";
import { Base } from "#models/Base.ts";
import { User } from "#models/User.ts";
import type { Abilities } from "#utils/abilities.ts";
import type { Actions } from "#utils/abilities.ts";
import { getAbilities } from "#utils/abilitiesContext.ts";
import { generateIdWithPrefix } from "#utils/generateId.ts";

declare module "@casl/ability" {
    interface RecordTypes {
        FileUpload: FileUpload;
    }
}

const log = Log.child({
    Model: "FileUpload",
});

@modelOptions({
    options: {
        customName: "FileUpload",
    },
})
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

    @prop({ required: true, trim: true, type: String })
    keyPrefix!: string;

    @prop({ required: true, type: Number })
    contentLengthInBytes!: number;

    static accessibleBy(
        this: ReturnModelType<typeof FileUpload>,
        action: Actions,
        abilities: Abilities | null | undefined = getAbilities(),
    ) {
        if (!abilities) {
            return this.find();
        }

        return this.find(accessibleBy(abilities, action).ofType("FileUpload"));
    }

    static oneAccessibleBy(
        this: ReturnModelType<typeof FileUpload>,
        action: Actions,
        abilities: Abilities | null | undefined = getAbilities(),
    ) {
        if (!abilities) {
            return this.findOne();
        }

        return this.findOne(
            accessibleBy(abilities, action).ofType("FileUpload"),
        );
    }
}

export { FileUpload };
