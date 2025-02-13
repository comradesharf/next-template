import assert from "node:assert";
import { AsyncLocalStorage } from "node:async_hooks";
import { t } from "@lingui/core/macro";
import type { FlattenMaps } from "mongoose";
import type { User } from "#User.ts";
import { type Abilities, defineAbilitiesForUser } from "#abilities.ts";
import { InternalServerError } from "#errors.ts";

const als = new AsyncLocalStorage<{
    abilities: Abilities;
    user?: FlattenMaps<User> | null | undefined;
}>();

export function getUserAbilities() {
    const abilities = als.getStore()?.abilities;
    assert.ok(abilities, new InternalServerError(t`User abilities not found`));
    return abilities;
}

export function getUser() {
    return als.getStore()?.user;
}

export async function withUserAbilities<R>(
    callback: () => R,
    user?: FlattenMaps<User> | null | undefined,
) {
    return als.run(
        {
            abilities: defineAbilitiesForUser(user),
            user,
        },
        callback,
    );
}
