import {DokumentasjonDtoType} from "../../../../../generated/new/model/dokumentasjonDtoType.ts";
import {LonnsInput} from "../../../../../generated/new/model/lonnsInput.ts";
import {BruttoNettoFormValues} from "./BruttoNetto.tsx";

export const bruttoNettoFormToLonnsInput = (
    opplysningstype: DokumentasjonDtoType,
    {brutto, netto}: BruttoNettoFormValues
): LonnsInput => ({
    type: opplysningstype,
    detalj: {brutto, netto, type: "LonnsInntektDto"},
    _type: "LonnsInput",
});
