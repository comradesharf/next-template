import * as _ from 'lodash-es';
import {
    type CallbackWithoutResultAndOptionalError,
    type Query,
    type Schema,
    Types,
    isObjectIdOrHexString,
} from 'mongoose';

export const objectIdPlugin = (schema: Schema) => {
    schema.pre('find', castToObjectId);
    schema.pre('findOne', castToObjectId);
    schema.pre('findOneAndReplace', castToObjectId);
    schema.pre('findOneAndUpdate', castToObjectId);
    schema.pre('findOneAndDelete', castToObjectId);

    /**
     * Convert object id in result to string instead of ObjectId
     */
    schema.post('find', convertToLeanObjectIds);
    schema.post('findOne', convertToLeanObjectIds);
    schema.post('findOneAndUpdate', convertToLeanObjectIds);
    schema.post('findOneAndReplace', convertToLeanObjectIds);
    schema.post('findOneAndDelete', convertToLeanObjectIds);
};

function castToObjectId(
    this: Query<unknown, unknown>,
    next: CallbackWithoutResultAndOptionalError,
) {
    try {
        toObjectId(
            this.getQuery(),
            this.getQuery(),
            this.getOptions()?.skipCastToObjectId,
        );
        next();
    } catch (e) {
        next(e as Error);
    }
}

export function toObjectId(
    value: unknown,
    root: Record<string, unknown>,
    skipOrSkipFn: ((path: string) => boolean) | boolean = false,
    parent = '',
) {
    if (Array.isArray(value)) {
        value.forEach((item, index) =>
            toObjectId(
                item,
                root,
                skipOrSkipFn,
                parent ? `${parent}.${index}` : `${index}`,
            ),
        );
    } else if (_.isPlainObject(value)) {
        Object.entries(value ?? {}).forEach(([key, value]) =>
            toObjectId(
                value,
                root,
                skipOrSkipFn,
                parent ? `${parent}.${key}` : `${key}`,
            ),
        );
    } else if (
        typeof value === 'string' &&
        isObjectIdOrHexString(value) &&
        (typeof skipOrSkipFn === 'boolean'
            ? !skipOrSkipFn
            : !skipOrSkipFn(parent))
    ) {
        _.set(root, parent, new Types.ObjectId(value));
    }
}

function convertToLeanObjectIds<T>(this: Query<string, unknown>, res: T) {
    if (res == null) {
        return;
    }

    if (this._mongooseOptions.lean) {
        replaceId(res, res);
    }
}

function replaceId(value: unknown, root: Record<string, unknown>, parent = '') {
    if (Array.isArray(value)) {
        value.forEach((item, index) =>
            replaceId(item, root, parent ? `${parent}.${index}` : `${index}`),
        );
    } else if (_.isPlainObject(value)) {
        Object.entries(value ?? {}).forEach(([key, value]) =>
            replaceId(value, root, parent ? `${parent}.${key}` : `${key}`),
        );
    } else if (isObjectId(value)) {
        _.set(root, parent, value.toString());
    }
}

function isObjectId(v: unknown): v is Types.ObjectId {
    if (v == null) {
        return false;
    }
    const proto = Object.getPrototypeOf(v);
    if (
        proto == null ||
        proto.constructor == null ||
        proto.constructor.name !== 'ObjectId'
    ) {
        return false;
    }
    return (
        typeof v === 'object' && '_bsontype' in v && v._bsontype === 'ObjectId'
    );
}
