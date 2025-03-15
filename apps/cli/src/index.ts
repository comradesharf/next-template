import { Command } from "commander";
import admins from "#admins.ts";
import agents from "#agents.ts";
import companies from "#companies.ts";
import fileUploads from "#fileUploads.ts";
import listings from "#listings.ts";

const command = new Command();
command
    .name("nexushome")
    .version("0.0.1")
    .description("CLI to administer the Nexus Home")
    .addCommand(fileUploads)
    .addCommand(companies)
    .addCommand(agents)
    .addCommand(admins)
    .addCommand(listings)
    .parse(process.argv);
