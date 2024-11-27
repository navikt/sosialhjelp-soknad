import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "./build",
    // FIXME: Use environment variables
    basePath: "/sosialhjelp/soknad",
    // For å unngå issues med nginx
    trailingSlash: false,
    output: "standalone",
    assetPrefix: process.env.NAIS_IDENTITY_PROVIDER?.length
        ? "https://cdn.nav.no/teamdigisos/sosialhjelp-soknad"
        : undefined,
    experimental: {
        optimizePackageImports: ["@navikt/ds-react", "@navikt/aksel-icons"],
    },
};

export default withNextIntl(nextConfig);
