import { accessibleBy } from "@casl/mongoose";
import { t } from "@lingui/core/macro";
import { type ReturnModelType, modelOptions, prop } from "@typegoose/typegoose";
import type { AdminId } from "app-schemas/AdminIdSchema";
import type { InitAdmin } from "app-schemas/InitAdminSchema";
import { User } from "#User.ts";
import { getUserAbilities } from "#abilities.node.ts";
import type { Actions, Subjects } from "#abilities.ts";
import { PreconditionFailedError, UnauthorizedError } from "#errors.ts";
import { generateIdWithPrefix } from "#model-utils.ts";

declare module "@casl/ability" {
    interface RecordTypes {
        Admin: Admin;
    }
}

@modelOptions({
    options: {
        customName: "Admin",
    },
})
class Admin extends User {
    @prop({
        required: true,
        type: String,
        default: generateIdWithPrefix("adm"),
    })
    declare _id: AdminId;

    declare role: "ADMIN";

    @prop({
        required: true,
        type: String,
        default: generateIdWithPrefix("api"),
        select: false,
    })
    accessSecret!: string;

    static accessibleBy(
        this: ReturnModelType<typeof Admin>,
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
        this: ReturnModelType<typeof Admin>,
        action: Actions,
        abilities = getUserAbilities(),
    ) {
        return this.findOne(
            accessibleBy(abilities, action).ofType(
                this.modelName as Extract<Subjects, string>,
            ),
        );
    }

    static async verifyUser(
        this: ReturnModelType<typeof Admin>,
        token: string,
    ) {
        const [accessId, accessSecret] = Buffer.from(token, "base64")
            .toString("utf-8")
            .split(":");

        return this.findOne({
            _id: accessId,
            accessSecret,
        }).orFail(() => new UnauthorizedError(t`Admin not found`));
    }

    static async initAdmin(
        this: ReturnModelType<typeof Admin>,
        { displayName, email, timezone }: InitAdmin,
    ) {
        const doc = await this.findOne();

        if (doc) {
            throw new PreconditionFailedError(t`Admin has been initialized`);
        }

        const newDoc = new this({
            displayName,
            email,
            timezone,
        });

        return newDoc.save();
    }
}

export { Admin };
