import { defineProject } from "vitest/config";

export default defineProject({
    resolve: {
        conditions: ["test"],
    },
    test: {
        include: ["src/**/*.integration.{ts,tsx}"],
        environment: "node",
        globalSetup: [
            "vitest.globalSetup.db.ts",
            "vitest.globalSetup.localstack.ts",
        ],
        setupFiles: [
            "dotenv/config",
            "vitest.setupFiles.db.ts",
            "vitest.setupFiles.localstack.ts",
        ],
        testTimeout: 20000,
        name: "model-tests-db",
        clearMocks: true,
    },
});
