import { defineConfig } from "@lingui/cli";
import { SupportedLocales } from "app-core/SupportedLocales";

export default defineConfig({
    locales: SupportedLocales.map(({ value }) => value),
    sourceLocale: "en",
    catalogs: [
        {
            path: "<rootDir>/src/locales/messages/{locale}",
            include: ["src"],
        },
    ],
    format: "po",
});
