import { DefaultPlace } from "app-model-mocks/Place";
import { PlaceSchema } from "app-schemas/PlaceSchema";
import { expect, test } from "vitest";

test("should validate PlaceSchema", () => {
    expect(PlaceSchema.parse(DefaultPlace)).toEqual(DefaultPlace);
});
