export interface Bostotte {
    bekreftelse: null | boolean;
    utbetalinger: Utbetaling[];
    saker: Sak[];
    stotteFraHusbankenFeilet: null | boolean;
    samtykke: boolean;
    samtykkeTidspunkt: null | Date;
}

export const initialBostotteState: Bostotte = {
    bekreftelse: null,
    samtykke: false,
    samtykkeTidspunkt: null,
    utbetalinger: [],
    saker: [],
    stotteFraHusbankenFeilet: null,
};

export interface Utbetaling {
    kilde: string;
    type: string;
    tittel: string;
    mottaker: string;
    netto: number;
    utbetalingsdato: string;
}

export interface Sak {
    dato: string;
    status: string;
    beskrivelse: string;
    vedtaksstatus: string;
}
