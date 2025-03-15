import {
    GetObjectCommand,
    type GetObjectCommandInput,
    S3Client,
} from "@aws-sdk/client-s3";
import {
    createPresignedPost as $createPresignedPost,
    type PresignedPostOptions,
} from "@aws-sdk/s3-presigned-post";

const client = new S3Client();

export interface GetObjectParams
    extends Omit<GetObjectCommandInput, "Bucket"> {}

export async function getObject(input: GetObjectParams) {
    const command = new GetObjectCommand({
        ...input,
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
    });
    return client.send(command);
}

export interface CreatePresignedPostParams
    extends Omit<PresignedPostOptions, "Bucket"> {}

export async function createPresignedPost(options: CreatePresignedPostParams) {
    return $createPresignedPost(client, {
        ...options,
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
    });
}
