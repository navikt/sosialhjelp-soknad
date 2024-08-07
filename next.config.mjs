/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Outputs a Single-Page Application (SPA).
    distDir: "./build", // Changes the build output directory to `./build/`.
    // FIXME: Use environment variables
    basePath: "/sosialhjelp/soknad",
};

export default nextConfig;
