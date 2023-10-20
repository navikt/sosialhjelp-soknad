import {defineConfig, loadEnv, PluginOption} from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
const {sentryVitePlugin} = require("@sentry/vite-plugin");

const plugins: PluginOption[] = [react(), viteTsconfigPaths()];

if (process.env.SENTRY_AUTH_TOKEN) {
    plugins.push(
        sentryVitePlugin({
            org: "nav",
            project: "sosialhjelp-soknad",
            authToken: process.env.SENTRY_AUTH_TOKEN,
        })
    );
}
export default defineConfig(({command, mode}) => {
    const env = loadEnv(mode, process.cwd(), "REACT_APP_");
    return {
        // depending on your application, base can also be "/"
        base: "/sosialhjelp/soknad",
        envPrefix: "REACT_APP_",
        build: {
            outDir: "build",
        },
        plugins: [],
        server: {
            // this ensures that the browser opens upon server start
            open: true,
            // this sets a default port to 3000
            port: 3000,
        },
        define: {
            DIGISOS_ENV: JSON.stringify(env.REACT_APP_DIGISOS_ENV),
        },
    };
});
