import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import eslint from "vite-plugin-eslint";

export default defineConfig(({command, mode}) => {
    const env = loadEnv(mode, process.cwd(), "REACT_APP_");
    return {
        // depending on your application, base can also be "/"
        base: "/sosialhjelp/soknad",
        envPrefix: "REACT_APP_",
        build: {
            outDir: "build",
            sourcemap: true,
        },
        plugins: [react(), viteTsconfigPaths(), eslint()],
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
