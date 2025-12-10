import createNextIntlPlugin from "next-intl/plugin";

const isRunningInDocker = process.env.CREATE_MESSAGES_DECLARATION === "skip";

const withNextIntl = createNextIntlPlugin({
    experimental: {
        // this re-generates a typescript definitions file for next-intl messages.
        // to avoid trying to write to a read-only docker image in production,
        // we skip updating this file if the environment variable is set (in Dockerfile)
        createMessagesDeclaration: isRunningInDocker ? undefined : "./messages/en.json",
    },
});
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    assetPrefix: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_ASSET_PREFIX : undefined,
    reactStrictMode: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "/sosialhjelp/soknad",
    serverExternalPackages: ["@navikt/next-logger", "next-logger", "pino"],
    experimental: {
        optimizePackageImports: ["@navikt/ds-react", "@navikt/aksel-icons"],
    },
};

export default withNextIntl(nextConfig);
