import { defineConfig } from "@rspack/cli";
import { BannerPlugin } from "@rspack/core";

export default defineConfig({
    entry: {
        nexushome: "./src/index.ts",
    },
    output: {
        clean: true,
        filename: "nexushome",
    },
    target: "node22",
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "builtin:swc-loader",
                    options: {
                        jsc: {
                            parser: {
                                syntax: "typescript",
                                jsx: true,
                                decorators: true,
                                dynamicImport: true,
                            },
                            transform: {
                                legacyDecorator: true,
                                decoratorMetadata: false,
                                react: {
                                    runtime: "automatic",
                                },
                            },
                            target: "es2022",
                        },
                    },
                },
            },
        ],
    },
    plugins: [
        new BannerPlugin({
            banner: "#!/usr/bin/env node",
            raw: true,
            entryOnly: true,
        }),
    ],
});
