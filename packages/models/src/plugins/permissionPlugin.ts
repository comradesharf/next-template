import {
    ForbiddenError,
    type MongoAbility,
    type RecordTypes,
    subject,
} from '@casl/ability';
import type {
    CallbackWithoutResultAndOptionalError,
    Document,
    Query,
    SaveOptions,
    Schema,
} from 'mongoose';
import type { Actions, Subjects } from '#utils/defineAbilityForUser.tsx';

declare module 'mongoose' {
    interface SaveOptions {
        userAbilities?: MongoAbility<[Actions, Subjects]>;
    }

    interface QueryOptions<DocType = unknown>
        extends PopulateOption,
            SessionOption {
        userAbilities?: MongoAbility<[Actions, Subjects]>;
        skipCastToObjectId?: ((path: string) => boolean) | boolean;
    }
}

/**
 * Do user ability check on query and save.
 */
export const permissionPlugin = (schema: Schema) => {
    schema.pre('save', checkUserAbilitiesOnSave);
    schema.pre('findOneAndReplace', checkUserAbilitiesOnPreQuery);
    schema.post(
        'findOneAndReplace',
        checkUserAbilitiesOnPostQuery(['update', 'create']),
    );
    schema.pre('findOneAndUpdate', checkUserAbilitiesOnPreQuery);
    schema.post(
        'findOneAndUpdate',
        checkUserAbilitiesOnPostQuery(['update', 'create']),
    );
};

/**
 * Check user abilities before saving document.
 *
 * @param next
 * @param options
 */
function checkUserAbilitiesOnSave(
    this: Document,
    next: CallbackWithoutResultAndOptionalError,
    options: SaveOptions,
) {
    try {
        if (!options?.userAbilities) {
            next();
            return;
        }

        const userAbilities = options.userAbilities;

        if (this.isNew) {
            ForbiddenError.from(userAbilities).throwUnlessCan(
                'create',
                this as unknown as RecordTypes[keyof RecordTypes],
            );
            next();
            return;
        }

        const modifiedFields: string[] = this.modifiedPaths({
            includeChildren: true,
        }).filter((field) => !['updated_at', 'created_at'].includes(field));

        modifiedFields.forEach((field) => {
            ForbiddenError.from(userAbilities).throwUnlessCan(
                'update',
                this as unknown as RecordTypes[keyof RecordTypes],
                field,
            );
        });

        next();
    } catch (e) {
        next(e as Error);
    }
}

/**
 * Check user abilities after findOneAndReplace action.
 */
function checkUserAbilitiesOnPreQuery<T>(
    this: Query<T, unknown>,
    next: CallbackWithoutResultAndOptionalError,
) {
    try {
        const userAbilities = this.getOptions()?.userAbilities;

        this.setOptions({
            new: this.getOptions().new ?? !!userAbilities,
        });

        next();
    } catch (e) {
        next(e as Error);
    }
}

/**
 * Check user abilities after findOneAndReplace action.
 */
function checkUserAbilitiesOnPostQuery(actions: Actions[]) {
    return function <T extends RecordTypes[keyof RecordTypes]>(
        this: Query<T, unknown>,
        result: T,
        next: CallbackWithoutResultAndOptionalError,
    ) {
        try {
            const userAbilities = this.getOptions()?.userAbilities;

            if (!userAbilities) {
                next();
                return;
            }

            if (this.getOptions().lean) {
                actions.forEach((action) => {
                    ForbiddenError.from(userAbilities).throwUnlessCan(
                        action,
                        subject(
                            this.model.modelName as keyof RecordTypes,
                            result,
                        ),
                    );
                });
            } else {
                actions.forEach((action) => {
                    ForbiddenError.from(userAbilities).throwUnlessCan(
                        action,
                        result,
                    );
                });
            }

            next();
        } catch (e) {
            next(e as Error);
        }
    };
}
