import { DefaultAdmin } from "app-models-mocks/Admin";
import { InitAdminSchema } from "app-schemas/InitAdminSchema";
import { expect, test } from "vitest";

test("should validate InitAdminSchema", () => {
    expect(
        InitAdminSchema.parse({
            email: DefaultAdmin.email,
            displayName: DefaultAdmin.displayName,
            timezone: DefaultAdmin.timezone,
        }),
    ).toEqual({
        email: DefaultAdmin.email,
        displayName: DefaultAdmin.displayName,
        timezone: DefaultAdmin.timezone,
    });
});
