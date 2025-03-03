import { type Mock, fn } from "@storybook/test";

// start:query

export const getCurrentSession: Mock = fn()
    .mockName("getCurrentSession")
    .mockResolvedValue(undefined);

export const getLeanCurrentUser: Mock = fn()
    .mockName("getLeanCurrentUser")
    .mockResolvedValue(undefined);

export const getHydratedCurrentUser: Mock = fn()
    .mockName("getHydratedCurrentUser")
    .mockResolvedValue(undefined);

export const getCurrentAbility: Mock = fn()
    .mockName("getCurrentAbility")
    .mockResolvedValue(undefined);
