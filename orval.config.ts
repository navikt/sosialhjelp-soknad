import {defineConfig} from "orval";
import {pascal} from "@orval/core";

export default defineConfig({
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
        },
        hooks: {
            afterAllFilesWrite: "prettier --write",
        },
    },
    "soknad-api-client-new-ssr": {
        input: "./soknad-api-new.json",
        output: {
            mode: "single",
            target: "src/generated/new-ssr",
            schemas: "src/generated/new-ssr/model",
            client: "fetch",
            override: {
                mutator: {
                    path: "./src/lib/api/ssr/authenticatedFetch.ts",
                    name: "authenticatedFetch",
                },
                operationName: ({operationId}) => ssrCamelCasePrefixer(operationId),
            },
            mock: false,
        },
        hooks: {
            afterAllFilesWrite: "prettier --write",
        },
    },
});

/**
 * Custom Orval function to prefix methods with "ssr" while retaining camelCase.
 *
 * operationIds are not strictly schematically mandated by openapi, but
 * we can still take them for granted because we use springdoc to generate
 * schemas for our Spring Boot backends, and springdoc - at least as configured
 * in soknad-api at the time of writing - always generates an operationId.
 *
 * If we're not using those operations, we don't have to care if one pops up unnamed.
 * So if the schema some day happens to include operations where operationId is missing,
 * we generate eye-catchingly implausible names for them rather than breaking the build.
 *
 * Maybe when the SSR code is used on a majority of pages, we can prefer it's always flagged,
 * and consider this an error instead.
 */
const ssrCamelCasePrefixer = (operationId: string | undefined) => {
    return `ssr${pascal(operationId ?? "MISSING_OPERATION_ID_IN_SPEC")}`;
};
