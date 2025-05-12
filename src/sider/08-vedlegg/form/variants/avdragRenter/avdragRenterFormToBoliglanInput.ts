import {BoliglanInput, DokumentasjonDtoType} from "../../../../../generated/new/model";

import {AvdragRenterFormValues} from "./AvdragRenterFormSchema.ts";

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
