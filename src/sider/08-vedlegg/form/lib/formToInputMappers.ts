import {BelopBeskrivelseFormValues} from "../schema/belopBeskrivelseForm.ts";
import {AvdragRenterFormValues} from "../schema/avdragRenterForm.ts";
import {BelopEnFormValues} from "../schema/belopEnForm.ts";
import {BruttoNettoFormValues} from "../schema/bruttoNettoForm.ts";
import {LonnsInput} from "../../../../generated/new/model/lonnsInput.ts";
import {GenericOkonomiInput} from "../../../../generated/new/model/genericOkonomiInput.ts";
import {DokumentasjonDtoType} from "../../../../generated/new/model/dokumentasjonDtoType.ts";
import {BoliglanInput} from "../../../../generated/new/model/boliglanInput.ts";

export const avdragRenterFormToBoliglanInput = (
    opplysningstype: DokumentasjonDtoType,
    avdragRenter: AvdragRenterFormValues["avdragRenter"]
): BoliglanInput => ({
    type: opplysningstype,
    detaljer: avdragRenter
        .filter(({avdrag, renter}) => renter || avdrag)
        .map(({avdrag, renter}) => ({renter, avdrag, type: "AvdragRenterDto"})),
    _type: "BoliglanInput",
});

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

export const belopEnFormToGenericOkonomiInput = (
    opplysningstype: DokumentasjonDtoType,
    {belop}: BelopEnFormValues
): GenericOkonomiInput => ({
    type: opplysningstype,
    detaljer: [{belop, type: "BelopDto"}],
    _type: "GenericOkonomiInput",
});

export const bruttoNettoFormToLonnsInput = (
    opplysningstype: DokumentasjonDtoType,
    {brutto, netto}: BruttoNettoFormValues
): LonnsInput => ({
    type: opplysningstype,
    detalj: {brutto, netto, type: "LonnsInntektDto"},
    _type: "LonnsInput",
});
