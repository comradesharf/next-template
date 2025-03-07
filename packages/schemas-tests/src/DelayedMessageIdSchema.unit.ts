import { faker } from "@faker-js/faker";
import { DelayedMessageIdSchema } from "app-schemas/DelayedMessageIdSchema";
import { expect, test } from "vitest";

test("should validate DelayedMessageIdSchema", () => {
    const id = faker.string.alphanumeric({ casing: "lower", length: 24 });
    expect(DelayedMessageIdSchema.parse(`delmsg_${id}`)).toEqual(
        `delmsg_${id}`,
    );
});
