import { type Mock, fn } from '@storybook/test';

export const signIn: Mock = fn()
    .mockName('signIn')
    .mockResolvedValue(undefined);
