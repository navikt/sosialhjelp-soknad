import {useTranslation} from "react-i18next";
import {VedleggFrontendType} from "../../../generated/model";
import {opplysningSpec} from "../../opplysninger";

export type OpplysningSpecTekster = {
    sporsmal: string;
    undertekst?: string;
    leggTilDokumentasjon?: string;
    leggTilRad?: string;
};

/**
 * Skiller ut i18n-tekstbehandling til en hook slik at det lettere lar seg gjøre å
 * kvalitetssikre at alle nødvendige tekster er oversatt.
 *
 * @param opplysningType
 */
export const useOpplysningTekster = (opplysningType: VedleggFrontendType): OpplysningSpecTekster => {
    const {textKey, numRows} = opplysningSpec[opplysningType];
    const {t, i18n} = useTranslation();

    const sanityCheck = () => {
        if (!i18n.exists(`${textKey}.sporsmal`)) throw new Error(`Missing translation for ${textKey}.sporsmal`);

        if (!i18n.exists(`${textKey}.leggtil`) && numRows === "flere")
            throw new Error(`Missing translation for ${textKey}.leggtil`);
    };

    const sporsmal = t(`${textKey}.sporsmal`);
    const undertekst = i18n.exists(`${textKey}.undertekst`) ? t(`${textKey}.undertekst`) : undefined;
    const leggTilRad = numRows === "flere" ? t(`${textKey}.leggtil`) : undefined;
    const leggTilDokumentasjon = i18n.exists(`${textKey}.vedlegg.sporsmal.tittel`)
        ? t(`${textKey}.vedlegg.sporsmal.tittel`)
        : undefined;

    sanityCheck();

    return {sporsmal, undertekst, leggTilRad, leggTilDokumentasjon};
};
