// start:import

import { CreateCompanySchema } from "app-schemas/CreateCompanySchema";
import { UpdateCompanySchema } from "app-schemas/UpdateCompanySchema";
import { Command } from "commander";
import { PrivateTRPCCommand } from "#commands.ts";

export default new Command("companies")
    // start:command
    .addCommand(
        new PrivateTRPCCommand("updateCompany")
            .argument("<input>", "Request body")
            .action(async function (this: PrivateTRPCCommand, input) {
                const params = UpdateCompanySchema.parse(JSON.parse(input));
                const response =
                    await this.trpc.companies.updateCompany.mutate(params);
                console.dir(response, { depth: null });
            }),
    )
    .addCommand(
        new PrivateTRPCCommand("createCompany")
            .argument("<input>", "Request body")
            .action(async function (this: PrivateTRPCCommand, input) {
                const params = CreateCompanySchema.parse(JSON.parse(input));
                const response =
                    await this.trpc.companies.createCompany.mutate(params);
                console.dir(response, { depth: null });
            }),
    )
    .description("Manage companies");
