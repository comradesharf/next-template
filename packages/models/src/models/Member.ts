import { accessibleBy } from "@casl/mongoose";
import { type ReturnModelType, modelOptions, prop } from "@typegoose/typegoose";
import { Log } from "app-core/Log";
import type { MemberId } from "app-schemas/MemberIdSchema";
import type { SignIn } from "app-schemas/SignInSchema";
import { MemberModel } from "#models/MemberModel.ts";
import { User } from "#models/User.ts";
import type { Abilities, Actions } from "#utils/abilities.ts";
import { getAbilities } from "#utils/abilitiesContext.ts";
import { generateIdWithPrefix } from "#utils/generateId.ts";

declare module "@casl/ability" {
    interface RecordTypes {
        Member: Member;
    }
}

const log = Log.child({
    Model: "Member",
});

@modelOptions({
    options: {
        customName: "Member",
    },
})
class Member extends User {
    @prop({
        required: true,
        type: String,
        default: generateIdWithPrefix("mbr"),
    })
    declare _id: MemberId;

    declare role: "MEMBER";

    static async authorize(
        params: (SignIn & { type: "user" }) | { type: "system"; email: string },
    ) {
        const user = await MemberModel.findOne({
            email: params.email,
        }).orFail();

        if (params.type === "user") {
            const authorized = await user.verifyPassword(params.password);
            if (!authorized) {
                return null;
            }
            return user;
        }
        return user;
    }

    static accessibleBy(
        this: ReturnModelType<typeof Member>,
        action: Actions,
        abilities: Abilities | null | undefined = getAbilities(),
    ) {
        if (!abilities) {
            return this.find();
        }

        return this.find(accessibleBy(abilities, action).ofType("Member"));
    }

    static oneAccessibleBy(
        this: ReturnModelType<typeof Member>,
        action: Actions,
        abilities: Abilities | null | undefined = getAbilities(),
    ) {
        if (!abilities) {
            return this.findOne();
        }

        return this.findOne(accessibleBy(abilities, action).ofType("Member"));
    }
}

export { Member };
