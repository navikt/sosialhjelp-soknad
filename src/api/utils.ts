import {
    getUpdateOkonomiskOpplysningMutationOptions,
    getKonverterVedleggMutationOptions,
    getUpdateAdresserMutationOptions,
    getCreateSoknadMutationOptions,
    getSendSoknadMutationOptions,
    getGetForventetDokumentasjonQueryKey,
} from "../generated";
import {MutationFunctionContext} from "@tanstack/react-query";

// List of mutation keys that do NOT require invalidation of forventetDokumentasjonQuery
const nonInvalidatingMutationKeys: string[] = [
    getUpdateOkonomiskOpplysningMutationOptions().mutationKey,
    getSendSoknadMutationOptions().mutationKey,
    getKonverterVedleggMutationOptions().mutationKey,
    getCreateSoknadMutationOptions().mutationKey,
    getUpdateAdresserMutationOptions().mutationKey,
].flat() as string[];

export function invalidateForventetDokumentasjonQuery(context: MutationFunctionContext, variables: unknown) {
    // Invalidate forventetDokumentasjon on any mutation that adds or removes dokumentasjon
    if (
        !nonInvalidatingMutationKeys.includes(context.mutationKey?.[0] as string) &&
        variables &&
        typeof variables === "object" &&
        "soknadId" in variables
    ) {
        return context.client.invalidateQueries({
            queryKey: getGetForventetDokumentasjonQueryKey(variables.soknadId as string),
        });
    }
}
