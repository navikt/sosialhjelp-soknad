export enum Sider {
    FORSIDEN = "https://www.nav.no",
    FINN_DITT_NAV_KONTOR = "https://www.nav.no/finnkontor",
    SERVERFEIL = "/serverfeil",
    START = "/informasjon",
    BOSTED = "/bosted",
}

export enum NavigasjonActionTypes {
    TIL_STEG = "navigasjon/TIL_STEG",
    TIL_START = "navigasjon/TIL_START",
    GA_VIDERE = "navigasjon/GA_VIDERE",
    GA_TILBAKE = "navigasjon/GA_TILBAKE",
    TIL_SERVERFEIL = "navigasjon/TIL_SERVERFEIL",
    TIL_KVITTERING = "navigasjon/TIL_KVITTERING",
}

export type NavigasjonActions = TilStart | GaTilbake | TilServerfeil | TilSteg | GaVidere | TilKvittering;

export interface TilServerfeil {
    type: NavigasjonActionTypes.TIL_SERVERFEIL;
}

export interface TilSteg {
    type: NavigasjonActionTypes.TIL_STEG;
    stegnummer: number;
    behandlingsId: string;
}

export interface TilStart {
    type: NavigasjonActionTypes.TIL_START;
}

export interface GaVidere {
    type: NavigasjonActionTypes.GA_VIDERE;
    stegnummer: number;
    behandlingsId: string;
}

export interface GaTilbake {
    type: NavigasjonActionTypes.GA_TILBAKE;
    stegnummer: number;
    behandlingsId: string;
}

export interface TilKvittering {
    type: NavigasjonActionTypes.TIL_KVITTERING;
    brukerbehandlingId: string;
}
