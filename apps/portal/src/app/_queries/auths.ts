import { UserModel } from "app-models/models/UserModel";
import { cache } from "react";
import { auth } from "#app/_libs/auths/auths.ts";

export const getCurrentSession = cache(() => auth());

export const getLeanCurrentUser = cache(async () => {
    const session = await getCurrentSession();
    if (!session) {
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
    return UserModel.hydrate(user);
});
