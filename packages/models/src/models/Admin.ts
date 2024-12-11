import { accessibleBy } from "@casl/mongoose";
import { type ReturnModelType, modelOptions, prop } from "@typegoose/typegoose";
import { Log } from "app-core/Log";
import type { AdminId } from "app-schemas/AdminIdSchema";
import { User } from "#models/User.ts";
import type { Abilities, Actions } from "#utils/abilities.ts";
import { getAbilities } from "#utils/abilitiesContext.ts";
import { generateIdWithPrefix } from "#utils/generateId.ts";

declare module "@casl/ability" {
    interface RecordTypes {
        Admin: Admin;
    }
}

const log = Log.child({
    Model: "Admin",
});

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
        abilities: Abilities | null | undefined = getAbilities(),
    ) {
        if (!abilities) {
            return this.find();
        }

        return this.find(accessibleBy(abilities, action).ofType("Admin"));
    }

    static oneAccessibleBy(
        this: ReturnModelType<typeof Admin>,
        action: Actions,
        abilities: Abilities | null | undefined = getAbilities(),
    ) {
        if (!abilities) {
            return this.findOne();
        }

        return this.findOne(accessibleBy(abilities, action).ofType("Admin"));
    }
}

export { Admin };
