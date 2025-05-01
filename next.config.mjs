import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
    experimental: {
        // Provide the path to the messages that you're using in `AppConfig`
        createMessagesDeclaration: "./messages/en.json",
    },
});
/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "./build", // Changes the build output directory to `./build/`.
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "/sosialhjelp/soknad",
    experimental: {
        optimizePackageImports: ["@navikt/ds-react", "@navikt/aksel-icons"],
    },
};

export default withNextIntl(nextConfig);
