import {
    AbilityBuilder,
    type MongoAbility,
    type RecordTypes,
    createMongoAbility,
} from "@casl/ability";
import type { FlattenMaps } from "mongoose";
import type { User } from "#models/User.ts";

export type Actions =
    | "create"
    | "read"
    | "update"
    | "delete"
    | "supervise"
    | "manage";

export type Subjects = keyof RecordTypes | RecordTypes[keyof RecordTypes];

export type Abilities = MongoAbility<[Actions, Subjects]>;

export const abilities = <U extends User>(
    user?: FlattenMaps<U> | null | undefined,
) => {
    const builder = new AbilityBuilder<Abilities>(createMongoAbility);

    const { can } = builder;

    can("read", "PhoneNumberVerification");
    can("create", "PresignedPostUrl");

    return builder.build();
};