import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "./build", // Changes the build output directory to `./build/`.
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "/sosialhjelp/soknad",
    // For å unngå issues med nginx
    trailingSlash: false,
    experimental: {
        optimizePackageImports: ["@navikt/ds-react", "@navikt/aksel-icons"],
    },
};

export default withNextIntl(nextConfig);
