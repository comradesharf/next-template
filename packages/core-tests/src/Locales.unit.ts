import * as Locales from "app-core/Locales";
import { expect, test } from "vitest";

test("should normalize locale", () => {
    expect(Locales.normalizeLocale("en")).toEqual(["en"]);
    expect(Locales.normalizeLocale("en-US")).toEqual(["enUS", "en"]);
});

test("should return default language when no Accept-Language header exists", () => {
    const headers = new Headers();
    expect(Locales.getRequestLocale(headers)).toEqual("en");
});

test("should return language from Accept-Language", () => {
    const headers = new Headers();
    headers.set("Accept-Language", "ms-MY");
    expect(Locales.getRequestLocale(headers)).toEqual("ms-MY");
});

test("should return fallback language when no matching language exists", () => {
    const headers = new Headers();
    headers.set("Accept-Language", "fr");
    expect(Locales.getRequestLocale(headers)).toEqual("en");
});
