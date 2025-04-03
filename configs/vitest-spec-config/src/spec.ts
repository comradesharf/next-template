import path from "node:path";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default function setupConfig(configs: string[] = ["db", "localstack"]) {
    const globalSetup = configs.map(
        (config) => new URL(`${config}.global.ts`, import.meta.url).pathname,
    );

    const setupFiles = configs.map(
        (config) => new URL(`${config}.setup.ts`, import.meta.url).pathname,
    );

    return defineConfig({
        esbuild: {
            jsx: "automatic",
        },
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
            include: ["src/**/*.spec.ts"],
            exclude: [],
            root: path.resolve(process.cwd(), "../.."),
            dir: process.cwd(),
            environment: "node",
            globalSetup,
            setupFiles,
            testTimeout: 20000,
            name: "spec-tests",
            clearMocks: true,
            env: loadEnv("test", process.cwd(), ""),
            passWithNoTests: true,
        },
    });
}
