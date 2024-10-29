import { type Mock, fn } from '@storybook/test';

export const verifyEmail: Mock = fn()
    .mockName('verifyEmail')
    .mockResolvedValue(undefined);
