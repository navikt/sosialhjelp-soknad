export interface Barneutgifter {
    harForsorgerplikt: boolean;
    bekreftelse: null | boolean;
    fritidsaktiviteter: boolean;
    barnehage: boolean;
    sfo: boolean;
    tannregulering: boolean;
    annet: boolean;
}

export const initialBarneutgifterState: Barneutgifter = {
    harForsorgerplikt: false,
    bekreftelse: null,
    fritidsaktiviteter: false,
    barnehage: false,
    sfo: false,
    tannregulering: false,
    annet: false,
};

export enum BarneutgifterKeys {
    HARFORSORGERPLIKT = "harForsorgerplikt",
    BEKREFTELSE = "bekreftelse",
    FRITIDSAKTIVITETER = "fritidsaktiviteter",
    BARNEHAGE = "barnehage",
    SFO = "sfo",
    TANNREGULERING = "tannregulering",
    ANNET = "annet",
}
