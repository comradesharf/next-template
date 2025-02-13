import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        conditions: ["test", "react-server", "node"],
        alias: {
            "@lingui/core/macro": "app-i18n/lingui",
            "@lingui/react/macro": "app-i18n/lingui",
        },
    },
    test: {
        include: ["src/**/*.unit.ts"],
        exclude: [],
        environment: "node",
        name: "unit-tests",
        clearMocks: true,
        env: loadEnv("test", process.cwd(), ""),
        passWithNoTests: true,
    },
});
