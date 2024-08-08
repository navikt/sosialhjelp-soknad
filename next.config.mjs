/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "./build", // Changes the build output directory to `./build/`.
    // FIXME: Use environment variables
    basePath: "/sosialhjelp/soknad",
    swcMinify: false,
};

export default nextConfig;
