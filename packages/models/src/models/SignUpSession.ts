import { randomBytes, scrypt } from 'node:crypto';
import * as Emails from '@comradesharf/emails/Emails';
import { EmailVerification } from '@comradesharf/emails/emails/EmailVerification';
import type { SignUp } from '@comradesharf/schemas/SignUpSchema';
import {
    type DocumentType,
    type ReturnModelType,
    index,
    modelOptions,
    prop,
} from '@typegoose/typegoose';
import type { SessionOption } from 'mongoose';
import { Base, generateIdWithPrefix } from '#models/Base.ts';
import { MemberModel } from '#models/MemberModel.ts';
import type { User } from '#models/User.ts';
import { UserModel } from '#models/UserModel.ts';
import { ServerActionError } from '#utils/errors.ts';

declare module '@casl/ability' {
    interface RecordTypes {
        SignUpSession: SignUpSession;
    }
}

@modelOptions({
    options: {
        customName: 'SignUpSession',
    },
})
@index({ created_at: 1 }, { expireAfterSeconds: 60 * 30 })
class SignUpSession extends Base {
    @prop({
        required: true,
        type: String,
        default: generateIdWithPrefix('sus'),
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

    @prop({
        required: true,
        trim: true,
        type: String,
        enum: ['MEMBER', 'ADMIN'],
    })
    role!: 'MEMBER' | 'ADMIN';

    @prop({
        required: true,
        lowercase: true,
        trim: true,
        type: String,
        maxlength: 5,
        minlength: 5,
    })
    otp!: string;

    static generateOTP() {
        return `${Math.floor(10000 + Math.random() * 90000)}`;
    }

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

    static async signUp(
        this: ReturnModelType<typeof SignUpSession>,
        {
            display_name,
            email,
            password,
            lang,
            role,
        }: SignUp & { lang: string; role: string },
        options: SessionOption = {},
    ) {
        const exists = await UserModel.exists({
            email: email.toLowerCase(),
        }).session(options.session ?? null);

        if (exists) {
            throw new ServerActionError({
                code: 'DUPLICATE_EMAIL',
            });
        }

        const session = await this.findOneAndUpdate(
            {
                email,
            },
            {
                $set: {
                    display_name,
                    role,
                    otp: this.generateOTP(),
                    password_hash: await this.saltAndHashPassword(password),
                },
            },
            {
                new: true,
                upsert: true,
            },
        )
            .session(options.session ?? null)
            .lean();

        Emails.sendMail({
            to: session.email,
            node: EmailVerification({
                lang,
                username: session.display_name,
                otp: session.otp,
            }),
        });

        return session;
    }

    static async verifyEmail(
        this: ReturnModelType<typeof SignUpSession>,
        { session: _id, otp }: { session: string; otp: string },
        options: SessionOption = {},
    ) {
        const session = await this.findOne({
            _id,
            otp,
        })
            .session(options.session ?? null)
            .lean();

        if (!session) {
            throw new ServerActionError({
                code: 'INVALID_OTP',
            });
        }

        let user: DocumentType<User>;
        if (session.role === 'MEMBER') {
            [user] = await MemberModel.create(
                [
                    {
                        email: session.email,
                        display_name: session.display_name,
                        role: session.role,
                        password_hash: session.password_hash,
                    },
                ],
                { session: options.session ?? null, lean: true },
            );
        } else {
            throw new ServerActionError({
                code: 'NOT_FOUND',
                data: {
                    type: 'user',
                },
            });
        }

        return user.toJSON();
    }
}

export { SignUpSession };
