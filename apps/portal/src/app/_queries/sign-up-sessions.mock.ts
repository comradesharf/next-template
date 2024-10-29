import { type Mock, fn } from '@storybook/test';

export const getSignUpSessionById: Mock = fn()
    .mockName('getSignUpSessionById')
    .mockResolvedValue(undefined);
