import { readFile } from "node:fs/promises";
import { beforeAll } from "vitest";

beforeAll(async () => {
    const file = await readFile("globalConfig_localstack-tests.json", "utf-8");
    const {
        __AWS_ENDPOINT_URL_S3__,
        __AWS_S3_BUCKET_NAME__,
        __AWS_REGION__,
        __AWS_ACCESS_KEY_ID__,
        __AWS_SECRET_ACCESS_KEY__,
        __AWS_ENDPOINT_URL_STS__,
    } = JSON.parse(file);
    process.env.AWS_ENDPOINT_URL_S3 = __AWS_ENDPOINT_URL_S3__;
    process.env.AWS_ENDPOINT_URL_STS = __AWS_ENDPOINT_URL_STS__;
    process.env.AWS_S3_BUCKET_NAME = __AWS_S3_BUCKET_NAME__;
    process.env.AWS_REGION = __AWS_REGION__;
    process.env.AWS_ACCESS_KEY_ID = __AWS_ACCESS_KEY_ID__;
    process.env.AWS_SECRET_ACCESS_KEY = __AWS_SECRET_ACCESS_KEY__;
});
