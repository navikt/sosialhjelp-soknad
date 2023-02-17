export interface SoknadState {
    // Visning state
    showSideIkkeFunnet: boolean;
    visLasteOppVedleggModal: boolean;
    visNedetidPanel: boolean;

    // Visning state skjema nivå
    showSendingFeiletPanel: boolean;
    showServerFeil: boolean;
}

export enum REST_STATUS {
    INITIALISERT = "INITIALISERT",
    PENDING = "PENDING",
    OK = "OK",
    SERVER_ERROR = "SERVER_ERROR",
    XSRF = "XSRF",
    FEILET = "FEILET",
}

export enum REST_FEIL {
    FOR_STOR_FIL = "vedlegg.opplasting.feil.forStor",
    SAMLET_VEDLEGG_STORRELSE_FOR_STOR = "vedlegg.opplasting.feil.samletStorrelseForStor",
    SAMLET_VEDLEGG_STORRELSE_FOR_STOR_ETTERSENDELSE = "ettersending.vedlegg.feil.samletStorrelseForStor",
    FEIL_FILTPYE = "vedlegg.opplasting.feil.filType",
    KRYPTERT_FIL = "opplasting.feilmelding.pdf.kryptert",
    SIGNERT_FIL = "opplasting.feilmelding.pdf.signert",
}
