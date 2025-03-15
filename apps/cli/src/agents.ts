// start:import

import { PrivateTRPCCommand } from "#commands.ts";

import { CreateAgentSchema } from "app-schemas/CreateAgentSchema";
import { UpdateAgentSchema } from "app-schemas/UpdateAgentSchema";
import { Command } from "commander";

export default new Command("agents")
    // start:command
    .addCommand(
        new PrivateTRPCCommand("updateAgent")
            .argument("<input>", "Request body")
            .action(async function (this: PrivateTRPCCommand, input) {
                const params = UpdateAgentSchema.parse(JSON.parse(input));
                const response =
                    await this.trpc.agents.updateAgent.mutate(params);
                console.dir(response, { depth: null });
            }),
    )
    .addCommand(
        new PrivateTRPCCommand("createAgent")
            .argument("<input>", "Request body")
            .action(async function (this: PrivateTRPCCommand, input) {
                const params = CreateAgentSchema.parse(JSON.parse(input));
                const response =
                    await this.trpc.agents.createAgent.mutate(params);
                console.dir(response, { depth: null });
            }),
    )
    .description("Manage agents");
