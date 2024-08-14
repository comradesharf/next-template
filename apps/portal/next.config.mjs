/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    transpilePackages: [
        '@comradesharf/emails',
        '@comradesharf/pdfs',
        '@comradesharf/trpc',
        '@comradesharf/models',
    ],
    experimental: {
        swcPlugins: [['@lingui/swc-plugin', {}]],
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        };

        config.module.rules.push({
            test: /\.po$/,
            use: {
                loader: '@lingui/loader',
            },
        });

        return config;
    },
};

export default nextConfig;
