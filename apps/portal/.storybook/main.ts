import { dirname, join } from 'node:path';
import type { StorybookConfig } from '@storybook/nextjs';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
    return dirname(require.resolve(join(value, 'package.json')));
}

const config = {
    stories: ['../src/app/**/*.@(mdx|stories.@(js|jsx|mjs|ts|tsx))'],
    addons: [
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-interactions'),
    ],
    framework: {
        name: getAbsolutePath('@storybook/nextjs'),
        options: {
            builder: {},
            nextConfigPath: require.resolve('../next.config.ts'),
        },
    },
    staticDirs: ['../public'],
    features: {
        experimentalRSC: true,
    },
    core: {
        disableTelemetry: true,
    },
    webpackFinal: async (config) => {
        config.module?.rules?.push({
            test: /\.po$/,
            use: {
                loader: '@lingui/loader',
            },
        });
        return config;
    },
} as StorybookConfig;

export default config;
