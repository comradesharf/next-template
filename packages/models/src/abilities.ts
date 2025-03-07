import {
    AbilityBuilder,
    type MongoAbility,
    type RecordTypes,
    createMongoAbility,
} from "@casl/ability";
import type { FlattenMaps } from "mongoose";
import type { Admin } from "#Admin.ts";
import type { User } from "#User.ts";

export type Actions =
    | "create"
    | "read"
    | "update"
    | "delete"
    | "supervise"
    | "manage";

export type Subjects = keyof RecordTypes | RecordTypes[keyof RecordTypes];

export type Abilities = MongoAbility<[Actions, Subjects]>;

export const defineAbilitiesForUser = <U extends User>(
    user?: FlattenMaps<U> | null | undefined,
) => {
    const builder = new AbilityBuilder<Abilities>(createMongoAbility);

    switch (user?.role) {
        case "ADMIN":
            buildAdmin(user as FlattenMaps<Admin>, builder);
            break;
        default:
            buildAnonymous(builder);
    }

    return builder.build();
};

function buildAnonymous(_: AbilityBuilder<MongoAbility<[Actions, Subjects]>>) {}

function buildAdmin(
    _user: FlattenMaps<Admin>,
    { can }: AbilityBuilder<MongoAbility<[Actions, Subjects]>>,
) {
    can(["create", "read", "update"], "FileUpload", {
        user: _user._id,
    });
    can(["create", "read", "update"], "FileUpload", {
        "user._id": _user._id,
    });
}
