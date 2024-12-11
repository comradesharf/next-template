import { defineProject } from "vitest/config";

export default defineProject({
    resolve: {
        conditions: ["test"],
    },
    test: {
        include: ["src/**/*.test.{ts,tsx}"],
        environment: "node",
        setupFiles: ["dotenv/config"],
        name: "model-tests-unit",
        clearMocks: true,
    },
});
