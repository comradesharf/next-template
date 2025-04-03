import path from "node:path";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
    ssr: {
        resolve: {
            conditions: ["node", "test"],
        },
    },
    resolve: {
        conditions: ["node", "test"],
        alias: {
            "@lingui/core/macro": "app-i18n/lingui",
            "@lingui/react/macro": "app-i18n/lingui",
        },
    },
    test: {
        include: ["src/**/*.unit.ts"],
        exclude: [],
        root: path.resolve(process.cwd(), "../.."),
        dir: process.cwd(),
        environment: "node",
        name: "unit-tests",
        clearMocks: true,
        env: loadEnv("test", process.cwd(), ""),
        passWithNoTests: true,
    },
});
