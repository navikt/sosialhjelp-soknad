export default {
    "soknad-api": {
        input: "./soknad-api.json",
        output: {
            mode: "tags-split",
            target: "src/generated/soknad-api-axios.ts",
            schemas: "src/generated/model",
            client: "react-query",
            override: {
                mutator: {
                    path: "./src/lib/orval/soknad-api-axios.ts",
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
};
