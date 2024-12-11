import { type Mock, fn } from "@storybook/test";

export const signUp: Mock = fn()
    .mockName("signUp")
    .mockResolvedValue(undefined);
