import {useTranslation} from "react-i18next";
import {opplysningSpec, formVariants} from "../../opplysninger";
import {DokumentasjonTexts} from "../../../locales/types";
import type {DokumentasjonDtoType} from "../../../generated/new/model";

/**
 * Skiller ut i18n-tekstbehandling til en hook slik at det lettere lar seg gjøre å
 * kvalitetssikre at alle nødvendige tekster er oversatt.
 *
 * @param opplysningType
 */
export const useDokumentasjonTekster = (opplysningType: DokumentasjonDtoType): DokumentasjonTexts => {
    const {formVariant} = opplysningSpec[opplysningType];
    const {numRows} = formVariants[formVariant];
    const {t} = useTranslation("dokumentasjon");

    const {sporsmal, undertekst, leggtil, dokumentBeskrivelse, renter, avdrag, belop, beskrivelse} = t(
        opplysningType,
        "",
        {
            returnObjects: true,
        }
    ) as unknown as DokumentasjonTexts;

    if (!sporsmal) throw new Error(`Missing translation for ${opplysningType}.sporsmal`);
    if (!leggtil && numRows === "flere") throw new Error(`Missing translation for ${opplysningType}.leggtil`);

    return {sporsmal, undertekst, leggtil, dokumentBeskrivelse, renter, avdrag, belop, beskrivelse} as const;
};
