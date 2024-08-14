import {
    AbilityBuilder,
    type MongoAbility,
    type RecordTypes,
    createMongoAbility,
} from '@casl/ability';
import type { FlattenMaps } from 'mongoose';
import type { User } from '#models/User.tsx';

export type Actions =
    | 'create'
    | 'read'
    | 'update'
    | 'delete'
    | 'supervise'
    | 'manage';

export type Subjects = keyof RecordTypes | RecordTypes[keyof RecordTypes];

export const defineAbilityForUser = <U extends User>(
    user?: FlattenMaps<U> | null | undefined,
) => {
    const builder = new AbilityBuilder<MongoAbility<[Actions, Subjects]>>(
        createMongoAbility,
    );
    return builder.build();
};
