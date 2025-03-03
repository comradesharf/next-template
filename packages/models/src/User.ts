import { modelOptions, prop } from "@typegoose/typegoose";
import { Base } from "#Base.ts";

declare module "@casl/ability" {
    interface RecordTypes {
        User: User;
    }
}

@modelOptions({
    schemaOptions: {
        discriminatorKey: "role",
    },
    options: {
        customName: "User",
    },
})
class User extends Base {
    _id!: string;

    @prop({
        required: true,
        trim: true,
        type: String,
    })
    displayName!: string;

    @prop({
        required: true,
        trim: true,
        type: String,
        default: process.env.NEXT_PUBLIC_DEFAULT_USER_TZ,
    })
    timezone!: string;

    @prop({
        required: true,
        trim: true,
        type: String,
        default: process.env.NEXT_PUBLIC_DEFAULT_USER_LOCALE,
    })
    locale!: string;

    @prop({
        required: true,
        lowercase: true,
        trim: true,
        type: String,
        unique: true,
    })
    email!: string;

    role!: string;
}

export { User };
