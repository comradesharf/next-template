import { type Mock, fn } from '@storybook/test';

export const getCurrentSession: Mock = fn()
    .mockName('getCurrentSession')
    .mockResolvedValue(undefined);

export const getLeanCurrentUser: Mock = fn()
    .mockName('getLeanCurrentUser')
    .mockResolvedValue(undefined);

export const getHydratedCurrentUser: Mock = fn()
    .mockName('getHydratedCurrentUser')
    .mockResolvedValue(undefined);
