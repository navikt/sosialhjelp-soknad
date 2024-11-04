import {defineConfig} from "orval";

export default defineConfig({
    "soknad-api-client-old": {
        input: "./soknad-api-old.json",
        output: {
            mode: "tags-split",
            target: "src/generated",
            schemas: "src/generated/model",
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
            prettier: true,
        },
    },
    "soknad-api-client-new": {
        input: "./soknad-api-new.json",
        output: {
            mode: "tags-split",
            target: "src/generated/new",
            schemas: "src/generated/new/model",
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
            prettier: true,
        },
    },
    driftsmeldinger: {
        input: "./driftsmelding-api.json",
        output: {
            baseUrl: "https://fakePlaceholder/", // blir overstyrt i driftsmeldingFetch.ts
            mode: "single",
            target: "src/generated/driftsmelding.ts",
            client: "fetch",
            mock: false,
            override: {
                mutator: {
                    path: "src/lib/driftsmeldingFetch.ts",
                    name: "driftsmeldingFetch",
                },
            },
        },
        hooks: {
            afterAllFilesWrite: "prettier --write",
        },
    },
    // TODO: Finne løsning for API-bruk på server-side
    // "soknad-api-ssr": {
    //     input: "./soknad-api.json",
    //     output: {
    //         mode: "tags-split",
    //         target: "src/generated/server/axiosInstance.ts",
    //         schemas: "src/generated/server/model",
    //         client: "axios-functions",
    //         override: {
    //             mutator: {
    //                 path: "./src/lib/api/axiosInstanceSsr.ts",
    //                 name: "axiosInstance",
    //             },
    //             transformer: (operation) => ({...operation, operationName: `${operation.operationName}Ssr`}),
    //         },
    //         // Vi bruker ikke mocks enda, og avventer ny versjon av orval
    //         // som støtter msw v2.
    //         mock: false,
    //     },
    //     hooks: {
    //         afterAllFilesWrite: "prettier --write",
    //     },
    // },
});
