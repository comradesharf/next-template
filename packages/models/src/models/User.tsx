import { randomBytes, scrypt } from 'node:crypto';
import { type DocumentType, modelOptions, prop } from '@typegoose/typegoose';
import { Base, generateIdWithPrefix } from '#models/Base.tsx';

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
    @prop({
        required: true,
        type: String,
        default: generateIdWithPrefix('usr'),
    })
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

    role!: string;

    static async saltAndHashPassword(password: string) {
        return new Promise((resolve, reject) => {
            const salt = randomBytes(16).toString('hex');
            scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(`${salt}:${derivedKey.toString('hex')}`);
                }
            });
        });
    }

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
