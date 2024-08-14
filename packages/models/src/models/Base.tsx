import { modelOptions, plugin, setGlobalOptions } from '@typegoose/typegoose';
import { deleteModel } from 'mongoose';
import { objectIdPlugin } from '#plugins/objectIdPlugin.ts';
import { permissionPlugin } from '#plugins/permissionPlugin.ts';

setGlobalOptions({
    schemaOptions: {
        // NOTE (xuwam - 25/04/2024): Don't add flattenObjectIds here since the object save to the database will be flatten
        // into string which is not what we want instead add to the toJSON option
        toObject: {},
        toJSON: {
            flattenObjectIds: true,
            virtuals: true,
        },
    },
    globalOptions: {
        disableGlobalCaching: process.env.NODE_ENV === 'development',
    },
});

if (process.env.NODE_ENV === 'development') {
    deleteModel(/.+/);
}

@plugin(objectIdPlugin)
@plugin(permissionPlugin)
@modelOptions({
    schemaOptions: {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
})
class Base {
    created_at!: Date;
    updated_at!: Date;
}

export { Base };
