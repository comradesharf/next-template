// start:import

import { GenerateListingReportDownloadUrlSchema } from "app-schemas/GenerateListingReportDownloadUrlSchema";
import { PrivateTRPCCommand } from "#commands.ts";

import { SaveListingSellInformationSchema } from "app-schemas/SaveListingSellInformationSchema";
import { Command } from "commander";

export default new Command("listings")
    // start:command
    .addCommand(
        new PrivateTRPCCommand("generateListingReportDownloadUrl")
            .argument("<input>", "Request body")
            .action(async function (this: PrivateTRPCCommand, input) {
                const params = GenerateListingReportDownloadUrlSchema.parse(
                    JSON.parse(input),
                );
                const response =
                    await this.trpc.listings.generateListingReportDownloadUrl.mutate(
                        params,
                    );
                console.dir(response, { depth: null });
            }),
    )
    .addCommand(
        new PrivateTRPCCommand("saveListingSellInformation")
            .argument("<input>", "Request body")
            .action(async function (this: PrivateTRPCCommand, input) {
                const params = SaveListingSellInformationSchema.parse(
                    JSON.parse(input),
                );
                const response =
                    await this.trpc.listings.saveListingSellInformation.mutate(
                        params,
                    );
                console.dir(response, { depth: null });
            }),
    )
    .description("Manage listings");
