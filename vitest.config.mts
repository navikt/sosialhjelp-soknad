import {defineConfig} from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());

export default defineConfig({
    plugins: [tsconfigPaths()],
    // Vite 8 transformerer med Oxc; uten dette feiler vite:client-inject på JSX
    // i .tsx-filer som bruker process.env.NODE_ENV (jsx: "preserve" fra @tsconfig/next).
    oxc: {jsx: {runtime: "automatic"}},
    test: {
        exclude: ["e2e/**", "node_modules/**", ".next/**"],
        environment: "jsdom",
    },
});
