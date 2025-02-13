import { defineConfig } from "@lingui/cli";
import locales from "app-core/locales.json";

export default defineConfig({
    locales: locales.map(({ value }) => value),
    sourceLocale: "en",
    catalogs: [
        {
            path: "<rootDir>/packages/emails/locales/{locale}",
            include: ["<rootDir>/packages/emails/src"],
        },
        {
            path: "<rootDir>/packages/models/locales/{locale}",
            include: ["<rootDir>/packages/models/src"],
        },
        {
            path: "<rootDir>/packages/pdfs/locales/{locale}",
            include: ["<rootDir>/packages/pdfs/src"],
        },
        {
            path: "<rootDir>/apps/portal/locales/{locale}",
            include: ["<rootDir>/apps/portal/src"],
        },
    ],
    catalogsMergePath: "<rootDir>/packages/i18n/src/locales/{locale}",
    compileNamespace: "ts",
    format: "po",
    rootDir: "../..",
}) as ReturnType<typeof defineConfig>;
