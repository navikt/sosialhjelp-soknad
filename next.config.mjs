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
    },
};

export default nextConfig;
