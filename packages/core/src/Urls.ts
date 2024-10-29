export namespace Urls {
    export const SiteUrl = (() => {
        if (process.env.STORYBOOK) {
            return 'http://localhost:6006/';
        }
        return process.env.NEXT_PUBLIC_SITE_URL!;
    })();

    export const AssetUrl = (() => {
        if (process.env.STORYBOOK) {
            return 'http://localhost:6006/';
        }
        return process.env.NEXT_PUBLIC_ASSET_URL!;
    })();

    export const TrpcUrl = (() => {
        if (process.env.STORYBOOK) {
            return 'http://localhost:6006';
        }
        return process.env.NEXT_PUBLIC_TRPC_URL!;
    })();

    export const BlogUrl = process.env.NEXT_PUBLIC_BLOG_URL!;
}
