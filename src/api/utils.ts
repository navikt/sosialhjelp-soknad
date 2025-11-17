import {getUpdateOkonomiskOpplysningMutationOptions} from "../generated/new/okonomiske-opplysninger-controller/okonomiske-opplysninger-controller.ts";
import {
    getCreateSoknadMutationOptions,
    getSendSoknadMutationOptions,
} from "../generated/new/soknad-lifecycle-controller/soknad-lifecycle-controller.ts";
import {getKonverterVedleggMutationOptions} from "../generated/file-converter-controller/file-converter-controller.ts";
import {getUpdateAdresserMutationOptions} from "../generated/new/adresse-controller/adresse-controller.ts";
import {MutationFunctionContext} from "@tanstack/react-query";
import {getGetForventetDokumentasjonQueryKey} from "../generated/new/dokumentasjon-controller/dokumentasjon-controller.ts";

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
