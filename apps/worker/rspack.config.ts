import { defineConfig } from "@rspack/cli";
import { sentryWebpackPlugin } from "@sentry/webpack-plugin";

export default defineConfig({
    entry: {
        nexushomed: "./src/index.ts",
    },
    output: {
        clean: true,
        filename: "worker.js",
    },
    target: "node22",
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    optimization: {
        minimize: false,
    },
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
                            experimental: {
                                plugins: [
                                    [
                                        "@lingui/swc-plugin",
                                        {
                                            runtimeModules: {
                                                useLingui: [
                                                    "app-i18n/lingui",
                                                    "useLingui",
                                                ],
                                                i18n: [
                                                    "app-i18n/lingui",
                                                    "i18n",
                                                ],
                                                trans: [
                                                    "app-i18n/lingui",
                                                    "Trans",
                                                ],
                                            },
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                },
            },
        ],
    },
    plugins: [
        sentryWebpackPlugin({
            org: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            telemetry: false,
            release: {
                name: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
            },
        }),
    ],
    resolve: {
        conditionNames: ["node", "require"],
    },
});
