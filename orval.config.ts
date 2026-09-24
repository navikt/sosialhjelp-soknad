import {defineConfig} from "orval";

export default defineConfig({
    "soknad-api-client-old": {
        input: "./soknad-api-old.json",
        output: {
            mode: "tags-split",
            target: "src/generated",
            schemas: "src/generated/model",
            client: "react-query",
            httpClient: "axios",
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
    "soknad-api-client-new": {
        input: "./soknad-api-new.json",
        output: {
            mode: "tags-split",
            target: "src/generated/new",
            schemas: "src/generated/new/model",
            client: "react-query",
            httpClient: "axios",
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
