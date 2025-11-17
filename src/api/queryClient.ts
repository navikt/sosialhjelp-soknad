import {isServer, QueryClient} from "@tanstack/react-query";
import {getGetForventetDokumentasjonQueryKey} from "../generated/new/dokumentasjon-controller/dokumentasjon-controller.ts";
import {getUpdateOkonomiskOpplysningMutationOptions} from "../generated/new/okonomiske-opplysninger-controller/okonomiske-opplysninger-controller.ts";
import {
    getCreateSoknadMutationOptions,
    getSendSoknadMutationOptions,
} from "../generated/new/soknad-lifecycle-controller/soknad-lifecycle-controller.ts";
import {getKonverterVedleggMutationOptions} from "../generated/file-converter-controller/file-converter-controller.ts";
import {getUpdateAdresserMutationOptions} from "../generated/new/adresse-controller/adresse-controller.ts";

const mutationKeys: string[] = [
    getUpdateOkonomiskOpplysningMutationOptions().mutationKey,
    getSendSoknadMutationOptions().mutationKey,
    getKonverterVedleggMutationOptions().mutationKey,
    getCreateSoknadMutationOptions().mutationKey,
    getUpdateAdresserMutationOptions().mutationKey,
].flat() as string[];

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            mutations: {
                onSuccess: (_data, variables: unknown | undefined, _, context): Promise<void> | undefined => {
                    // Invalidate forventetDokumentasjon on any mutation that adds or removes dokumentasjon
                    if (
                        !mutationKeys.includes(context.mutationKey?.[0] as string) &&
                        variables &&
                        typeof variables === "object" &&
                        "soknadId" in variables
                    ) {
                        return context.client.invalidateQueries({
                            queryKey: getGetForventetDokumentasjonQueryKey(variables.soknadId as string),
                        });
                    }
                },
            },
            queries: {
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
