import {isServer, QueryClient} from "@tanstack/react-query";
import {invalidateForventetDokumentasjonQuery} from "./utils.ts";
import {isAxiosError} from "axios";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            mutations: {
                onSuccess: (
                    _data,
                    variables: unknown | undefined,
                    _onMutateResult,
                    context
                ): Promise<void> | undefined => invalidateForventetDokumentasjonQuery(context, variables),
                throwOnError: (error) => isAxiosError(error) && error.response?.status === 403,
            },
            queries: {
                throwOnError: (error) => isAxiosError(error) && error.response?.status === 403,
                staleTime: 60 * 1000,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
    if (isServer) {
        // Server: always make a new query client
        return makeQueryClient();
    } else {
        // Browser: make a new query client if we don't already have one
        // This is very important, so we don't re-make a new client if React
        // suspends during the initial render. This may not be needed if we
        // have a suspense boundary BELOW the creation of the query client
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}
