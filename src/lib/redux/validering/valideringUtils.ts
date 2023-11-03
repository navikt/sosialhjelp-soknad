import {Valideringsfeil, ValideringsFeilKode} from "./valideringActionTypes";

// For å unngå at man dispatcher samme identiske feilmelding flere ganger, kan denne funksjonen brukes:
export const onEndretValideringsfeil = (
    nyFeilkode: ValideringsFeilKode | undefined,
    faktumKey: string,
    feil: Valideringsfeil[],
    callback: () => void
) => {
    let eksisterendeFeil: Valideringsfeil | undefined;
    if (feil) {
        eksisterendeFeil = feil.find((valideringsfeil: Valideringsfeil) => valideringsfeil.faktumKey === faktumKey);
    }
    const eksisterendeFeilkode: string | undefined =
        eksisterendeFeil && eksisterendeFeil.feilkode ? eksisterendeFeil.feilkode : undefined;
    if (eksisterendeFeilkode !== nyFeilkode) {
        callback();
    }
};
