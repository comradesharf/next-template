import { Command } from "commander";

const command = new Command();
command
    .name("faberling")
    .version("0.0.1")
    .description("CLI to administer the Faberling")
    .parse(process.argv);
