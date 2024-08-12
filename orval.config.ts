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
    "soknad-api-ssr": {
        input: "./soknad-api.json",
        output: {
            mode: "tags-split",
            target: "src/generated/server/axiosInstance.ts",
            schemas: "src/generated/server/model",
            client: "axios-functions",
            override: {
                mutator: {
                    path: "./src/lib/api/axiosInstanceSsr.ts",
                    name: "axiosInstance",
                },
                transformer: (operation) => ({...operation, operationName: `${operation.operationName}Ssr`}),
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
