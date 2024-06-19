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
    const {t, i18n} = useTranslation("dokumentasjon");

    const sanityCheck = () => {
        if (!i18n.exists(`${textKey}.sporsmal`)) throw new Error(`Missing translation for ${textKey}.sporsmal`);

        if (!i18n.exists(`${textKey}.leggtil`) && numRows === "flere")
            throw new Error(`Missing translation for ${textKey}.leggtil`);
    };

    const sporsmal = t(`${opplysningType}.sporsmal` as const);
    const undertekst = i18n.exists(`${opplysningType}.undertekst`) ? t(`${opplysningType}.undertekst`) : undefined;
    const leggTilRad = numRows === "flere" ? t(`${opplysningType}.leggtil`) : undefined;
    const leggTilDokumentasjon = i18n.exists(`${opplysningType}.dokumentBeskrivelse`)
        ? t(`${opplysningType}.dokumentBeskrivelse`)
        : undefined;

    sanityCheck();

    return {sporsmal, undertekst, leggTilRad, leggTilDokumentasjon};
};
