import {defineConfig} from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import nextEnv from "@next/env";
import react from "@vitejs/plugin-react";

nextEnv.loadEnvConfig(process.cwd());

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        exclude: ["e2e/**", "node_modules/**", ".next/**"],
        environment: "jsdom",
    },
});
