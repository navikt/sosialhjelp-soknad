import {NavEnhet} from "../../digisos/skjema/personopplysninger/adresse/AdresseTypes";

export const erPaStegEnOgValgtNavEnhetErUgyldig = (stegnummer: number, valgtNavEnhet: NavEnhet | undefined): boolean => {
    return stegnummer === 1 && (!valgtNavEnhet || (valgtNavEnhet && valgtNavEnhet.isMottakMidlertidigDeaktivert))
};