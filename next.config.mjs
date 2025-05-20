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
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "/sosialhjelp/soknad",
    experimental: {
        optimizePackageImports: ["@navikt/ds-react", "@navikt/aksel-icons"],
    },
};

export default withNextIntl(nextConfig);
