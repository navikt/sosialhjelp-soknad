export enum ValideringActionTypeKeys {
    VIS_VALIDERINGSFEIL_PANEL = "validering/VIS_VALIDERINGSFEIL_PANEL",
    SKJUL_VALIDERINGSFEIL_PANEL = "validering/SKJUL_VALIDERINGSFEIL_PANEL",
    SET_VALIDERINGSFEIL = "validering/SET_VALIDERINGSFEIL",
    CLEAR_VALIDERINGSFEIL = "validering/CLEAR_VALIDERINGSFEIL",
    CLEAR_ALL_VALIDERINGSFEIL = "validering/CLEAR_ALL_VALIDERINGSFEIL",
}

export interface VisValideringsfeilPanelAction {
    type: ValideringActionTypeKeys.VIS_VALIDERINGSFEIL_PANEL;
}

export interface SkjulValideringsfeilPanelAction {
    type: ValideringActionTypeKeys.SKJUL_VALIDERINGSFEIL_PANEL;
}

export interface SetValideringsfeilAction {
    type: ValideringActionTypeKeys.SET_VALIDERINGSFEIL;
    valideringsfeil: Valideringsfeil;
}

export interface ClearValideringsfeilAction {
    type: ValideringActionTypeKeys.CLEAR_VALIDERINGSFEIL;
    faktumKey: string;
}

export interface ClearAllValideringsfeilAction {
    type: ValideringActionTypeKeys.CLEAR_ALL_VALIDERINGSFEIL;
}

export type ValideringActionTypes =
    | VisValideringsfeilPanelAction
    | SkjulValideringsfeilPanelAction
    | SetValideringsfeilAction
    | ClearValideringsfeilAction
    | ClearAllValideringsfeilAction;

export enum ValideringsFeilKode {
    PAKREVD = "validering.pakrevd",
    FIL_EKSISTERER_IKKE = "validering.filEksistererIkke",
    FELT_EKSISTERER_IKKE = "validering.feltEksistererIkke",
    MIN_LENGDE = "validering.minLengde",
    MAX_LENGDE = "validering.maksLengde",
    ER_TALL = "validering.erTall",
    ER_TELEFONNUMMER = "validering.erTelefonnummer",
    ER_KONTONUMMER = "validering.erKontonummer",
    ER_FDATO = "validering.erFdato",
    ER_FDATO_ETTER_IDAG = "validering.erFdatoEtterIdag",
    SOKNADSMOTTAKER_PAKREVD = "soknadsmottaker.feilmelding",
    ER_SAMVAERSGRAD = "validering.erSamvaersgrad",
}

export interface Valideringsfeil {
    faktumKey: string;
    feilkode: ValideringsFeilKode;
}
