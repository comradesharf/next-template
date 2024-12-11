import { AsyncLocalStorage } from "node:async_hooks";
import type { FlattenMaps } from "mongoose";
import type { User } from "#models/User.ts";
import { type Abilities, abilities } from "#utils/abilities.ts";

const als = new AsyncLocalStorage<Abilities>();

export function getAbilities() {
    return als.getStore();
}

export async function withAbilities<R, U extends User>(
    callback: () => R,
    user?: FlattenMaps<U> | null | undefined,
) {
    return als.run(abilities(user), callback);
}
