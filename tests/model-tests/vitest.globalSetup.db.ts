import { unlink, writeFile } from "node:fs/promises";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import type { MongoMemoryReplSetOpts } from "mongodb-memory-server-core/lib/MongoMemoryReplSet";

const config: Partial<MongoMemoryReplSetOpts> = {
    binary: {
        version: "8.0.3",
        checkMD5: false,
    },
    replSet: {
        count: 1,
        storageEngine: "wiredTiger",
    },
};

declare global {
    var __MONGOD__: MongoMemoryReplSet | undefined;
}

export async function setup() {
    global.__MONGOD__ = await MongoMemoryReplSet.create(config);
    if (global.__MONGOD__.state !== "running") {
        await global.__MONGOD__.start();
    }
    await writeFile(
        "globalConfig_model-tests.json",
        JSON.stringify({
            __MONGOD_URI__: global.__MONGOD__.getUri(),
        }),
    );
}

export async function teardown() {
    try {
        await unlink("globalConfig_model-tests.json");
    } catch (error) {
        console.warn(error);
    }
    await global.__MONGOD__?.stop();
}
