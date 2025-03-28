import {useTranslation} from "react-i18next";
import {opplysningSpec} from "../../opplysninger";
import {DokumentasjonTexts} from "../../../locales/types";
import {OpplysningsType} from "./useGrupper.ts";

/**
 * Skiller ut i18n-tekstbehandling til en hook slik at det lettere lar seg gjøre å
 * kvalitetssikre at alle nødvendige tekster er oversatt.
 *
 * @param opplysningType
 */
export const useDokumentasjonTekster = (opplysningType: OpplysningsType): DokumentasjonTexts => {
    const {numRows} = opplysningSpec[opplysningType];
    const {t} = useTranslation("dokumentasjon");

    const {sporsmal, undertekst, leggtil, dokumentBeskrivelse} = t(opplysningType, "", {
        returnObjects: true,
    }) as unknown as DokumentasjonTexts;

    if (!sporsmal) throw new Error(`Missing translation for ${opplysningType}.sporsmal`);
    if (!leggtil && numRows === "flere") throw new Error(`Missing translation for ${opplysningType}.leggtil`);

    return {sporsmal, undertekst, leggtil, dokumentBeskrivelse};
};
