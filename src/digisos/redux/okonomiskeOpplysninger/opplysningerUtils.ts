import {Opplysning} from "./opplysningerTypes";
import {opplysningSpec, VedleggFrontendsMinusEtParTingSomTrengerAvklaring} from "./opplysningerConfig";

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
