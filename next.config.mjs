/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "./build", // Changes the build output directory to `./build/`.
    // FIXME: Use environment variables
    basePath: "/sosialhjelp/soknad",
    // For å unngå issues med nginx
    trailingSlash: true,
    swcMinify: false,
    experimental: {
        instrumentationHook: true,
        optimizePackageImports: ["@navikt/ds-react", "@navikt/aksel-icons"]
    },

};

export default nextConfig;
