import { type Mock, fn } from '@storybook/test';

export const signOut: Mock = fn()
    .mockName('signOut')
    .mockResolvedValue(undefined);
