import {VedleggFrontend, VedleggFrontends} from "../../../generated/model";

/**
 * Oppdaterer opplysningens rader i queryClient cache.
 *
 * Økonomiske opplysninger kommer inn via GET okonomiskeOpplysninger som en svær datastruktur type VedleggFrontends,
 * men oppdateringer gjøres ved PUT til samme ressurs med en enkelt VedleggFrontend i request body. ¯\_(ツ)_/¯
 *
 * Dette matcher dårlig med generelle REST-prinsipper og dermed også Orvals modell for cache-nøkler, derav denne funksjonen -
 * som fletter inn en oppdatering til en enkelt VedleggFrontend i browserens cachede VedleggFrontends fra GET okonomiskeOpplysninger.
 *
 * @param currentData VedleggFrontends som er hentet fra browser cache
 * @param updatedVedlegg VedleggFrontend som skal flettes inn i VedleggFrontends og lagres i browser cache
 */
export const mergeRowUpdateIntoQueryData = (
    currentData: VedleggFrontends,
    updatedVedlegg: VedleggFrontend
): VedleggFrontends => {
    if (!currentData?.okonomiskeOpplysninger)
        throw new Error("burde ikke skje: økonomiske opplysninger forsøkt oppdatert før de er hentet?");

    const cachedOpplysninger = currentData?.okonomiskeOpplysninger;
    const opplysningIndex = cachedOpplysninger.findIndex(({type}) => type === updatedVedlegg.type);

    if (opplysningIndex === -1)
        throw new Error(
            `burde ikke skje: forsøk på å oppdatere VedleggFrontend av type "${updatedVedlegg.type}", som ikke eksisterer i cachet VedleggFrontends`
        );

    currentData.okonomiskeOpplysninger[opplysningIndex] = updatedVedlegg;

    return currentData;
};
