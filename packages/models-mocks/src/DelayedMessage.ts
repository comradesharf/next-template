import { faker } from "@faker-js/faker";
import { fn } from "@vitest/spy";
import { DelayedMessageStatus } from "app-core/DelayedMessages";
import { generateIdWithPrefix } from "app-models/model-utils";
import type { StructDelayedMessage } from "app-models/models";
import type { FlattenMaps } from "mongoose";
import type { Overwrites } from "#utils.ts";

export function generateDelayedMessage({
    _id = generateIdWithPrefix("delmsg")(),
    createdAt = faker.date.past(),
    updatedAt = faker.date.past(),
    __v = faker.number.int(),
    executedAt = faker.date.soon(),
    status = faker.helpers.enumValue(DelayedMessageStatus),
    reschedule = fn().mockName("reschedule"),
    retryCount = faker.number.int(),
}: Overwrites<
    StructDelayedMessage.DelayedMessage,
    "type"
> = {}): FlattenMaps<StructDelayedMessage.DelayedMessage> {
    return {
        _id,
        createdAt,
        updatedAt,
        __v,
        executedAt,
        status,
        reschedule,
        retryCount,
        type: "DelayedMessage",
    };
}

export const DefaultDelayedMessage = generateDelayedMessage();
