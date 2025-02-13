import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    transpilePackages: ["app-core", "app-i18n"],
    experimental: {
        swcPlugins: [
            [
                "@lingui/swc-plugin",
                {
                    runtimeModules: {
                        useLingui: ["app-i18n/lingui", "useLingui"],
                        i18n: ["app-i18n/lingui", "i18n"],
                        trans: ["app-i18n/lingui", "Trans"],
                    },
                },
            ],
        ],
    },
};

export default nextConfig;
