import { faker } from '@faker-js/faker/locale/de';
import { Types } from 'mongoose';
import { expect, test } from 'vitest';
import { toObjectId } from '#plugins/objectIdPlugin.ts';

test('should convert object that has object id like to object id', () => {
    const value = {
        value1: faker.database.mongodbObjectId(),
        value2: faker.lorem.slug(),
        value3: faker.date.past(),
        value4: faker.number.int(),
        value5: faker.number.float(),
        value6: [
            faker.database.mongodbObjectId(),
            faker.lorem.slug(),
            faker.date.past(),
            faker.number.int(),
            faker.number.float(),
        ],
        value7: {
            value1: {
                value1: {
                    value1: {
                        value1: faker.database.mongodbObjectId(),
                        value2: faker.lorem.slug(),
                        value3: faker.date.past(),
                        value4: faker.number.int(),
                        value5: faker.number.float(),
                        value6: [
                            faker.database.mongodbObjectId(),
                            faker.lorem.slug(),
                            faker.date.past(),
                            faker.number.int(),
                            faker.number.float(),
                        ],
                        value9: faker.database.mongodbObjectId(),
                    },
                },
            },
        },
        value8: {
            _id: faker.database.mongodbObjectId(),
        },
        value9: {
            _id: faker.database.mongodbObjectId(),
        },
    };
    toObjectId(value, value, (key) => key.includes('value9'));
    expect(value).toEqual(
        expect.objectContaining({
            value1: expect.any(Types.ObjectId),
            value2: expect.any(String),
            value3: expect.any(Date),
            value4: expect.any(Number),
            value5: expect.any(Number),
            value6: expect.arrayContaining([
                expect.any(Types.ObjectId),
                expect.any(String),
                expect.any(Date),
                expect.any(Number),
            ]),
            value7: {
                value1: {
                    value1: {
                        value1: {
                            value1: expect.any(Types.ObjectId),
                            value2: expect.any(String),
                            value3: expect.any(Date),
                            value4: expect.any(Number),
                            value5: expect.any(Number),
                            value6: expect.arrayContaining([
                                expect.any(Types.ObjectId),
                                expect.any(String),
                                expect.any(Date),
                                expect.any(Number),
                            ]),
                            value9: expect.any(String),
                        },
                    },
                },
            },
            value8: {
                _id: expect.any(Types.ObjectId),
            },
            value9: {
                _id: expect.any(String),
            },
        }),
    );
});
