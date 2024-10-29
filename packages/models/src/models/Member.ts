import * as Emails from '@comradesharf/emails/Emails';
import { EmailVerification } from '@comradesharf/emails/emails/EmailVerification';
import type { SignIn } from '@comradesharf/schemas/SignInSchema';
import type { SignUp } from '@comradesharf/schemas/SignUpSchema';
import { type ReturnModelType, modelOptions, prop } from '@typegoose/typegoose';
import type { SessionOption } from 'mongoose';
import { generateIdWithPrefix } from '#models/Base.ts';
import { MemberModel } from '#models/MemberModel.ts';
import { User } from '#models/User.ts';

declare module '@casl/ability' {
    interface RecordTypes {
        Member: Member;
    }
}

@modelOptions({
    options: {
        customName: 'Member',
    },
})
class Member extends User {
    @prop({
        required: true,
        type: String,
        default: generateIdWithPrefix('mbr'),
    })
    _id!: string;

    declare role: 'MEMBER';

    static async authorize(
        params: (SignIn & { type: 'user' }) | { type: 'system'; email: string },
    ) {
        const user = await MemberModel.findOne({
            email: params.email,
        }).orFail();

        if (params.type === 'user') {
            const authorized = await user.verifyPassword(params.password);
            if (!authorized) {
                return null;
            }
            return user;
        }
        return user;
    }
}

export { Member };
