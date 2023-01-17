export default {
    "soknad-api": {
        input: "./soknad-api.json",
        output: {
            mode: "tags-split",
            target: "src/generated/soknad-api.ts",
            schemas: "src/generated/model",
            client: "react-query",
            override: {
                mutator: {
                    path: "./src/lib/orval/axios-instance.ts",
                    name: "axiosInstance",
                },
                useDates: true,
            },
            mock: true,
        },
        hooks: {
            afterAllFilesWrite: "prettier --write",
        },
    },
};
