import { scrypt } from 'node:crypto';
import { type DocumentType, modelOptions, prop } from '@typegoose/typegoose';
import { Base } from '#models/Base.ts';

declare module '@casl/ability' {
    interface RecordTypes {
        User: User;
    }
}

@modelOptions({
    schemaOptions: {
        discriminatorKey: 'role',
    },
    options: {
        customName: 'User',
    },
})
class User extends Base {
    _id!: string;

    @prop({
        required: true,
        trim: true,
        type: String,
    })
    display_name!: string;

    @prop({
        required: true,
        trim: true,
        type: String,
    })
    password_hash!: string;

    @prop({
        required: true,
        lowercase: true,
        trim: true,
        type: String,
        unique: true,
    })
    email!: string;

    @prop({
        required: true,
        trim: true,
        type: String,
        default: process.env.NEXT_PUBLIC_DEFAULT_USER_TZ,
    })
    timezone!: string;

    role!: string;

    async verifyPassword(this: DocumentType<User>, password: string) {
        const [salt, key] = this.password_hash.split(':');

        return new Promise<boolean>((resolve, reject) => {
            scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(key === derivedKey.toString('hex'));
                }
            });
        });
    }
}

export { User };
