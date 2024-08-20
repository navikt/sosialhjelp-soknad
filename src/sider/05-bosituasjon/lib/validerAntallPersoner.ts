// Parse og validér antall personer.
// Returnerer en tallstreng ved et gyldig heltall, undefined ved tom streng, ellers exception.
import {ValideringsFeilKode} from "../../../lib/validering";

export const validerAntallPersoner = (formValue: string) => {
    if (!formValue.length) return undefined;

    const antallPersoner = parseFloat(formValue);
    if (isNaN(antallPersoner) || !Number.isInteger(antallPersoner)) throw new Error(ValideringsFeilKode.ER_TALL);
    return antallPersoner;
};
