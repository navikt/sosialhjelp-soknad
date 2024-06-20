import {useTranslation} from "react-i18next";
import {VedleggFrontendType} from "../../../generated/model";
import {opplysningSpec} from "../../opplysninger";
import {DokumentasjonTexts} from "../../../locales/types";

/**
 * Skiller ut i18n-tekstbehandling til en hook slik at det lettere lar seg gjøre å
 * kvalitetssikre at alle nødvendige tekster er oversatt.
 *
 * @param opplysningType
 */
export const useDokumentasjonTekster = (opplysningType: VedleggFrontendType): DokumentasjonTexts => {
    const {numRows} = opplysningSpec[opplysningType];
    const {t} = useTranslation("dokumentasjon");

    const {sporsmal, undertekst, leggtil, dokumentBeskrivelse} = t(`${opplysningType}`, {returnObjects: true});

    if (!sporsmal) throw new Error(`Missing translation for ${opplysningType}.sporsmal`);
    if (!leggtil && numRows === "flere") throw new Error(`Missing translation for ${opplysningType}.leggtil`);

    return {sporsmal, undertekst, leggtil, dokumentBeskrivelse};
};
