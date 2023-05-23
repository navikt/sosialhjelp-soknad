import {Opplysning} from "./opplysningerTypes";
import {
    opplysningSpec,
    sortertSpecGammeltFormat,
    VedleggFrontendMinusEtParTingSomTrengerAvklaring,
    VedleggFrontendsMinusEtParTingSomTrengerAvklaring,
} from "./opplysningerConfig";
import {logError} from "../../../nav-soknad/utils/loggerUtils";
import {VedleggFrontendType} from "../../../generated/model";

export const updateSortertOpplysning = (
    opplysninger: VedleggFrontendMinusEtParTingSomTrengerAvklaring[],
    opplysningUpdated: VedleggFrontendMinusEtParTingSomTrengerAvklaring
) => {
    const index = opplysninger.findIndex((o) => o.type === opplysningUpdated.type);
    opplysninger[index] = opplysningUpdated;
    return opplysninger;
};

export const getSortertListeAvOpplysninger = ({
    okonomiskeOpplysninger,
    slettedeVedlegg,
}: VedleggFrontendsMinusEtParTingSomTrengerAvklaring): Opplysning[] => {
    const current = okonomiskeOpplysninger.map((opplysning): Opplysning => ({...opplysning}));
    const deleted = slettedeVedlegg.map((opplysning): Opplysning => ({...opplysning, slettet: true}));
    return [...current, ...deleted].sort(
        (a: Opplysning, b: Opplysning) => opplysningSpec[a.type].sortKey - opplysningSpec[b.type].sortKey
    );
};

/**
 * @deprecated til fordel for lookups mot opplysningerSpec.
 *    (noter at selve typen som returneres også er endret)
 * @example
 *      før: const spc: OpplysningSpecGammeltFormat = getSpcForOpplysning(vedlegg.type);
 *      nå: const spec: OpplysningSpec = opplysningSpec[vedlegg.type];
 * @param opplysningType
 */
export const getSpcForOpplysning = (opplysningType: VedleggFrontendType) => {
    const spec = sortertSpecGammeltFormat.find(({type}) => type === opplysningType);

    if (!spec) logError(`Spc ikke funnet for opplysning med type: "${opplysningType}"`);

    return spec!;
};
