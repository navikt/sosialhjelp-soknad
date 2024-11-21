import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "./build", // Changes the build output directory to `./build/`.
    // FIXME: Use environment variables
    basePath: "/sosialhjelp/soknad",
    // For å unngå issues med nginx
    trailingSlash: false,
    output: "standalone",
    assetPrefix: process.env.DIGISOS_ENV === "localhost" ? undefined : "https://cdn.nav.no/teamdigisos/sosialhjelp-soknad",
    experimental: {
        optimizePackageImports: ["@navikt/ds-react", "@navikt/aksel-icons"],
    },
};

export default withNextIntl(nextConfig);
