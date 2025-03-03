import {
    AbilityBuilder,
    type MongoAbility,
    type RecordTypes,
    createMongoAbility,
} from "@casl/ability";
import type { FlattenMaps } from "mongoose";
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
        default:
            buildAnonymous(builder);
    }

    return builder.build();
};

function buildAnonymous(_: AbilityBuilder<MongoAbility<[Actions, Subjects]>>) {}
