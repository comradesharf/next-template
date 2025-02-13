import "server-only";
import { defineAbilitiesForUser } from "app-models/abilities";
import type { HydratedDocument } from "app-models/model-utils";
import type { StructUser } from "app-models/models";
import { UserModel } from "app-models/models";
import { cache } from "react";
import { auth } from "#app/_libs/auths/auths.ts";

// start:query

export const getCurrentSession = cache(() => auth());

export const getLeanCurrentUser = cache(async () => {
    const session = await getCurrentSession();
    if (!session?.user) {
        return null;
    }
    return UserModel.findById(session.user.id)
        .select("-password_hash")
        .lean()
        .orFail();
});

export const getHydratedCurrentUser = cache(async () => {
    const user = await getLeanCurrentUser();
    if (!user) {
        return null;
    }
    return UserModel.hydrate(user) as HydratedDocument<StructUser.User>;
});

export const getCurrentAbilities = cache(async () => {
    const user = await getLeanCurrentUser();
    return defineAbilitiesForUser(user);
});
