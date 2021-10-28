export enum Sider {
    FORSIDEN = "https://www.nav.no",
    FINN_DITT_NAV_KONTOR = "https://www.nav.no/finnkontor",
    SERVERFEIL = "/serverfeil",
    START = "/informasjon",
    BOSTED = "/bosted",
}

export enum NavigasjonActionTypes {
    TIL_SERVERFEIL = "navigasjon/TIL_SERVERFEIL",
}

export type NavigasjonActions = TilServerfeil;

export interface TilServerfeil {
    type: NavigasjonActionTypes.TIL_SERVERFEIL;
}
