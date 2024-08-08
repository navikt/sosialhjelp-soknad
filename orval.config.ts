import {defineConfig} from "orval";

export default defineConfig({
    "soknad-api-client": {
        input: "./soknad-api.json",
        output: {
            mode: "tags-split",
            target: "src/generated/client/axiosInstance.ts",
            schemas: "src/generated/client/model",
            client: "react-query",
            override: {
                mutator: {
                    path: "./src/lib/api/axiosInstance.ts",
                    name: "axiosInstance",
                },
            },
            // Vi bruker ikke mocks enda, og avventer ny versjon av orval
            // som støtter msw v2.
            mock: false,
        },
        hooks: {
            afterAllFilesWrite: "prettier --write",
        },
    },
});
