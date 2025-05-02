import {DokumentasjonDtoType} from "../../../../../generated/new/model/dokumentasjonDtoType.ts";
import {GenericOkonomiInput} from "../../../../../generated/new/model/genericOkonomiInput.ts";
import {BelopEnFormValues} from "./BelopEnSchema.ts";

export const belopEnFormToGenericOkonomiInput = (
    opplysningstype: DokumentasjonDtoType,
    {belop}: BelopEnFormValues
): GenericOkonomiInput => ({
    type: opplysningstype,
    detaljer: [{belop, type: "BelopDto"}],
    _type: "GenericOkonomiInput",
});
