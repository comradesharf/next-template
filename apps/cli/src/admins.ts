// start:import

import { InitAdminSchema } from "app-schemas/InitAdminSchema";
import { Command } from "commander";
import { PublicTRPCCommand } from "#commands.ts";

export default new Command("admins")
    // start:command
    .addCommand(
        new PublicTRPCCommand("initAdmin")
            .argument("<input>", "Request body")
            .action(async function (this: PublicTRPCCommand, input) {
                const params = InitAdminSchema.parse(JSON.parse(input));
                const response =
                    await this.trpc.admins.initAdmin.mutate(params);
                console.dir(response, { depth: null });
            }),
    )
    .description("Manage admins");
