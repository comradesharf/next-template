import type { SignUp } from '@comradesharf/schemas/SignUpSchema';
import { type ReturnModelType, modelOptions, prop } from '@typegoose/typegoose';
import type { SessionOption } from 'mongoose';
import { generateIdWithPrefix } from '#models/Base.tsx';
import { User } from '#models/User.tsx';

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

    static async signUp(
        this: ReturnModelType<typeof Member>,
        { display_name, email, password }: SignUp,
        options: SessionOption = {},
    ) {
        await this.create(
            [
                {
                    display_name,
                    email,
                    password_hash: await this.saltAndHashPassword(password),
                },
            ],
            options,
        );
    }
}

export { Member };
