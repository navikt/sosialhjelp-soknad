import {defineConfig} from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environment: "jsdom",
    },
});
