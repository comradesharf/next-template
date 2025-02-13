import { unlink, writeFile } from "node:fs/promises";
import {
    LocalstackContainer,
    type StartedLocalStackContainer,
} from "@testcontainers/localstack";

declare global {
    var __LOCALSTACKD__: StartedLocalStackContainer | undefined;
}

export async function setup() {
    global.__LOCALSTACKD__ = await new LocalstackContainer(
        "localstack/localstack:4.0.3",
    )
        .withEnvironment({
            SERVICES: "s3,sts,iam",
            PERSISTENCE: "0",
        })
        .withLogConsumer((stream) => {
            stream.on("data", (line) => console.log(line));
        })
        .start();

    await global.__LOCALSTACKD__.exec([
        "awslocal",
        "s3api",
        "create-bucket",
        "--bucket",
        "test-bucket",
    ]);

    const port = global.__LOCALSTACKD__.getPort();

    await writeFile(
        "globalConfig_localstack-tests.json",
        JSON.stringify({
            __AWS_ENDPOINT_URL_S3__: `http://s3.localhost.localstack.cloud:${port}`,
            __AWS_ENDPOINT_URL_STS__: `http://sts.localhost.localstack.cloud:${port}`,
            __AWS_S3_BUCKET_NAME__: "test-bucket",
            __AWS_REGION__: "us-east-1",
            __AWS_ACCESS_KEY_ID__: "test",
            __AWS_SECRET_ACCESS_KEY__: "test",
        }),
    );
}

export async function teardown() {
    try {
        await unlink("globalConfig_localstack-tests.json");
    } catch (error) {
        console.warn(error);
    }
    await global.__LOCALSTACKD__?.stop();
}
