import {
    GetObjectCommand,
    type GetObjectCommandInput,
    S3Client,
} from "@aws-sdk/client-s3";
import {
    createCredentialChain,
    fromNodeProviderChain,
    fromTemporaryCredentials,
} from "@aws-sdk/credential-providers";
import {
    createPresignedPost as $createPresignedPost,
    type PresignedPostOptions,
} from "@aws-sdk/s3-presigned-post";

const client = new S3Client({
    credentials: createCredentialChain((options) => {
        if (!process.env.AWS_ROLE_ARN) {
            return fromNodeProviderChain()(options);
        }
        return fromTemporaryCredentials({
            params: {
                RoleArn: process.env.AWS_ROLE_ARN!,
                RoleSessionName: "PortalSession",
                DurationSeconds: 3600,
            },
        })(options);
    }),
});

export async function getObject(input: Omit<GetObjectCommandInput, "Bucket">) {
    const command = new GetObjectCommand({
        ...input,
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
    });
    return client.send(command);
}

export async function createPresignedPost(
    options: Omit<PresignedPostOptions, "Bucket">,
) {
    return $createPresignedPost(client, {
        ...options,
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
    });
}
