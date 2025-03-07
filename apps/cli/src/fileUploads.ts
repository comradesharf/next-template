import { readFile } from "node:fs/promises";
import * as path from "node:path";
import { CompleteFileUploadSchema } from "app-schemas/CompleteFileUploadSchema";
import { GeneratePresignedPostUrlSchema } from "app-schemas/GeneratePresignedPostUrlSchema";
import { Command } from "commander";
import { PrivateTRPCCommand } from "#commands.ts";

export default new Command("fileUploads")
    // start:command
    .addCommand(
        new PrivateTRPCCommand("completeFileUpload")
            .argument("<input>", "Request body")
            .action(async function (this: PrivateTRPCCommand, input) {
                const params = CompleteFileUploadSchema.parse(
                    JSON.parse(input),
                );
                const response =
                    await this.trpc.fileUploads.completeFileUpload.mutate(
                        params,
                    );
                console.dir(response, { depth: null });
            }),
    )
    .addCommand(
        new PrivateTRPCCommand("generatePresignedPostUrl")
            .argument("<input>", "Request body")
            .action(async function (this: PrivateTRPCCommand, input) {
                const params = GeneratePresignedPostUrlSchema.parse(
                    JSON.parse(input),
                );
                const response =
                    await this.trpc.fileUploads.generatePresignedPostUrl.mutate(
                        params,
                    );
                console.dir(response, { depth: null });
            }),
    )
    .addCommand(
        new PrivateTRPCCommand("uploadFile")
            .argument("<file>", "File path")
            .requiredOption("-p, --prefix <prefix>", "Prefix")
            .requiredOption("-t, --type <type>", "MIME type")
            .option(
                "-m, --meta <meta>",
                "Repeatable meta key=value pairs",
                (value, previous) => {
                    const [key, val] = value.split("=");
                    return { ...previous, [key]: val };
                },
                {},
            )
            .action(async function (this: PrivateTRPCCommand, input, options) {
                let file: Buffer;
                try {
                    file = await readFile(path.resolve(input));
                } catch (e) {
                    console.error("Failed to read file", e);
                    return;
                }

                const fu =
                    await this.trpc.fileUploads.generatePresignedPostUrl.mutate(
                        GeneratePresignedPostUrlSchema.parse({
                            keyPrefix: options.prefix,
                            type: options.type,
                            name: path.basename(input),
                            meta: options.meta,
                        }),
                    );

                const formData = new FormData();
                Object.entries(fu.meta).forEach(([key, value]) => {
                    formData.append(key, value);
                });
                formData.append(
                    "file",
                    new Blob([file], { type: options.type }),
                );

                const response = await fetch(fu.url, {
                    body: formData,
                    method: "POST",
                });

                if (!response.ok) {
                    console.error(
                        "Failed to upload file",
                        await response.text(),
                    );
                    return;
                }

                console.log(
                    "File upload completed",
                    await this.trpc.fileUploads.completeFileUpload.mutate(
                        CompleteFileUploadSchema.parse(fu),
                    ),
                );
            }),
    )
    .description("Manage fileUploads");
