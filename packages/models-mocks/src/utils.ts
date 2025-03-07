import { faker } from "@faker-js/faker";
import type { FlattenMaps } from "app-models/model-utils";

export const Required = Symbol("Required");

export type UndefinedKeys<T extends {}> = {
    [K in keyof T]+?: K extends "createdAt" | "updatedAt"
        ? T[K]
        : undefined extends T[K]
          ? T[K] | null | typeof Required
          : T[K];
};

export type Overwrites<
    T extends {},
    K extends keyof T | undefined = undefined,
> = undefined extends K
    ? UndefinedKeys<FlattenMaps<T>>
    : Omit<UndefinedKeys<FlattenMaps<T>>, NonNullable<K>>;

export function maybe<T>(
    fn: (value: T) => void,
    value: T | undefined | typeof Required | null,
    defaultOrGenerate: T | ((...args: any[]) => T),
) {
    if (value === null) {
        return;
    }

    if (value === Required) {
        fn(
            defaultOrGenerate instanceof Function
                ? defaultOrGenerate()
                : defaultOrGenerate,
        );
        return;
    }

    if (value !== undefined) {
        fn(value);
        return;
    }

    faker.helpers.maybe(() => {
        const value =
            defaultOrGenerate instanceof Function
                ? defaultOrGenerate()
                : defaultOrGenerate;

        fn(value);
    });
}
