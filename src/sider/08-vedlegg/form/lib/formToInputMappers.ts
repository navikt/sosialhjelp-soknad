import {BelopBeskrivelseFormValues} from "../schema/belopBeskrivelseForm.ts";
import {AvdragRenterFormValues} from "../schema/avdragRenterForm.ts";
import {BelopEnFormValues} from "../schema/belopEnForm.ts";
import {BruttoNettoFormValues} from "../schema/bruttoNettoForm.ts";
import {LonnsInput} from "../../../../generated/new/model/lonnsInput.ts";
import {GenericOkonomiInput} from "../../../../generated/new/model/genericOkonomiInput.ts";
import {BoliglanInput} from "../../../../generated/new/model/boliglanInput.ts";

export const avdragRenterFormToBoliglanInput = (
    avdragRenter: AvdragRenterFormValues["avdragRenter"]
): BoliglanInput => ({
    detaljer: avdragRenter
        .filter(({avdrag, renter}) => renter || avdrag)
        .map(({avdrag, renter}) => ({renter, avdrag, type: "AvdragRenterDto"})),
    _type: "BoliglanInput",
});

export const belopBeskrivelseFormToGenericOkonomiInput = (
    belopBeskrivelse: BelopBeskrivelseFormValues["belopBeskrivelse"]
): GenericOkonomiInput => ({
    detaljer: belopBeskrivelse
        .filter(({belop, beskrivelse}) => belop || beskrivelse)
        .map(({belop, beskrivelse}) => ({belop, beskrivelse, type: "BelopDto"})),
    _type: "GenericOkonomiInput",
});

export const belopEnFormToGenericOkonomiInput = ({belop}: BelopEnFormValues): GenericOkonomiInput => ({
    detaljer: [{belop, type: "BelopDto"}],
    _type: "GenericOkonomiInput",
});

export const bruttoNettoFormToLonnsInput = ({brutto, netto}: BruttoNettoFormValues): LonnsInput => ({
    detalj: {brutto, netto, type: "LonnsInntektDto"},
    _type: "LonnsInput",
});
