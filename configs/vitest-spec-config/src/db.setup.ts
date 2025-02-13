import assert from "node:assert";
import { readFile } from "node:fs/promises";
import {
    close,
    connect,
    createCollections,
    destroy,
    syncIndexes,
} from "app-models/db";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";

afterAll(async () => {
    await destroy();
});

beforeAll(async () => {
    const file = await readFile("globalConfig_model-tests.json", "utf-8");
    const { __MONGOD_URI__ } = JSON.parse(file);
    process.env.__MONGOD_URI__ = __MONGOD_URI__;
});

afterEach(async () => {
    await close();
});

beforeEach(async () => {
    const mongoUri = process.env.__MONGOD_URI__;
    assert(!!mongoUri, "__MONGOD_URI__ environment variable isn't set");
    const uri = new URL(mongoUri);
    uri.pathname = crypto.randomUUID();
    process.env.MONGODB_URI = uri.toString();
    await connect();
    await createCollections();
    await syncIndexes();
});
