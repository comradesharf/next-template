import {
    createTRPCClient as $createTRPCClient,
    type CreateTRPCClient,
    httpLink,
    splitLink,
    unstable_httpSubscriptionLink,
} from "@trpc/client";
import type { AdminRouter } from "app-trpc/admin";
import { Command, Option } from "commander";
import superjson from "superjson";

function createPrivateTRPCClient({
    trpcUrl,
    accessId,
    accessSecret,
}: {
    accessSecret: string;
    accessId: string;
    trpcUrl: string;
}): CreateTRPCClient<AdminRouter> {
    return $createTRPCClient<AdminRouter>({
        links: [
            splitLink({
                condition: (op) => op.type === "subscription",
                true: unstable_httpSubscriptionLink({
                    url: `${trpcUrl}/api/admin`,
                    transformer: superjson,
                }),
                false: httpLink({
                    url: `${trpcUrl}/api/admin`,
                    transformer: superjson,
                    headers: () => {
                        const encoded = Buffer.from(
                            `${accessId}:${accessSecret}`,
                        ).toString("base64");

                        return {
                            Authorization: `Basic ${encoded}`,
                        };
                    },
                }),
            }),
        ],
    });
}

function createPublicTRPCClient({
    trpcUrl,
}: {
    trpcUrl: string;
}): CreateTRPCClient<AdminRouter> {
    return $createTRPCClient<AdminRouter>({
        links: [
            splitLink({
                condition: (op) => op.type === "subscription",
                true: unstable_httpSubscriptionLink({
                    url: `${trpcUrl}/api/admin`,
                    transformer: superjson,
                }),
                false: httpLink({
                    url: `${trpcUrl}/api/admin`,
                    transformer: superjson,
                }),
            }),
        ],
    });
}

export class PrivateTRPCCommand extends Command {
    constructor(name?: string) {
        super(name);
        this.addOption(
            new Option(
                "--access-secret <accessSecret>",
                "Access secret to authenticate with the Nexus Home",
            )
                .env("NEXUS_HOME_ACCESS_SECRET")
                .makeOptionMandatory(),
        )
            .addOption(
                new Option(
                    "--access-id <accessId>",
                    "Access ID to authenticate with the Nexus Home",
                )
                    .env("NEXUS_HOME_ACCESS_ID")
                    .makeOptionMandatory(),
            )
            .addOption(
                new Option("--trpc-url <trpcUrl>", "URL to the TRPC server")
                    .env("NEXUS_HOME_TRPC_URL")
                    .default("http://localhost:3000/portal"),
            );
    }

    #trpc?: CreateTRPCClient<AdminRouter>;

    get trpc(): CreateTRPCClient<AdminRouter> {
        if (!this.#trpc) {
            const { accessId, accessSecret, trpcUrl } = this.opts();
            this.#trpc = createPrivateTRPCClient({
                accessId,
                accessSecret,
                trpcUrl,
            });
        }
        return this.#trpc;
    }
}

export class PublicTRPCCommand extends Command {
    constructor(name?: string) {
        super(name);
        this.addOption(
            new Option("--trpc-url <trpcUrl>", "URL to the TRPC server")
                .env("NEXUS_HOME_TRPC_URL")
                .default("http://localhost:3000/portal"),
        );
    }

    #trpc?: CreateTRPCClient<AdminRouter>;

    get trpc(): CreateTRPCClient<AdminRouter> {
        if (!this.#trpc) {
            const { trpcUrl } = this.opts();
            this.#trpc = createPublicTRPCClient({
                trpcUrl,
            });
        }
        return this.#trpc;
    }
}
