import { defineProject } from 'vitest/config';

export default defineProject({
    test: {
        include: ['src/**/*.db.{ts,tsx}'],
        environment: 'node',
        globalSetup: ['vitest.globalSetup.db.ts'],
        setupFiles: ['dotenv/config', 'vitest.setupFiles.db.ts'],
        testTimeout: 20000,
    },
});
