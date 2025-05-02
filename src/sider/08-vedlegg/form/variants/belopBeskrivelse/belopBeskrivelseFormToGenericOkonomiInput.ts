import {DokumentasjonDtoType} from "../../../../../generated/new/model/dokumentasjonDtoType.ts";
import {GenericOkonomiInput} from "../../../../../generated/new/model/genericOkonomiInput.ts";
import {BelopBeskrivelseFormValues} from "./BelopBeskrivelseFormSchema.tsx";

export const belopBeskrivelseFormToGenericOkonomiInput = (
    opplysningstype: DokumentasjonDtoType,
    belopBeskrivelse: BelopBeskrivelseFormValues["belopBeskrivelse"]
): GenericOkonomiInput => ({
    type: opplysningstype,
    detaljer: belopBeskrivelse
        .filter(({belop, beskrivelse}) => belop || beskrivelse)
        .map(({belop, beskrivelse}) => ({belop, beskrivelse, type: "BelopDto"})),
    _type: "GenericOkonomiInput",
});
