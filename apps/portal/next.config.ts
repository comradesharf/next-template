import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const assetRemotePattern = (() => {
    const url = new URL(process.env.NEXT_PUBLIC_ASSET_URL);

    const protocol = url.protocol.slice(0, -1) as 'http' | 'https';

    return {
        protocol,
        hostname: url.hostname,
    };
})();

const nextConfig: NextConfig = {
    output: 'standalone',
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
        '@comradesharf/schemas',
    ],
    experimental: {
        swcPlugins: [['@lingui/swc-plugin', {}]],
        serverMinification: false,
    },
    images: {
        remotePatterns: [assetRemotePattern],
        minimumCacheTTL: 31536000,
    },
    async redirects() {
        return [
            {
                source: '/:locale/orders',
                destination: '/:locale/orders/recent-orders',
                permanent: false,
            },
        ];
    },
};

export default withSentryConfig(nextConfig, {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    // release: {
    //     name: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
    //     deploy: {
    //         env: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
    //     },
    // },

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Automatically annotate React components to show their full name in breadcrumbs and session replay
    reactComponentAnnotation: {
        enabled: true,
    },

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: false,
    autoInstrumentServerFunctions: false,
    autoInstrumentAppDirectory: true,
    autoInstrumentMiddleware: false,
    telemetry: false,
});
