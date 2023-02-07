import {ErSystemdataEndret, Samtykke} from "./soknadActionTypes";

export interface SoknadState {
    // Visning state
    showSideIkkeFunnet: boolean;
    visSamtykkeInfo: boolean;
    visLasteOppVedleggModal: boolean;
    visMidlertidigDeaktivertPanel: boolean;
    visIkkePakobletPanel: boolean;
    visNedetidPanel: boolean;

    // Visning state skjema nivå
    showSendingFeiletPanel: boolean;
    showServerFeil: boolean;

    // Authentication / tilgang state
    harTilgang: boolean;
    sperrekode: TilgangSperrekode | undefined;

    // Rest state
    restStatus: REST_STATUS;

    // Tilgang og fornavn
    tilgang: undefined | TilgangResponse;

    // Opprettelse, innsending og ettersendelse
    startSoknadPending: boolean;
    startSoknadFeilet: boolean;
    sendSoknadPending: boolean;

    // Avbryt state
    visAvbrytOgSlettModal: boolean;

    // Soknad state
    behandlingsId: string | undefined;

    // Systemdata state
    erSystemdataEndret: ErSystemdataEndret;

    // Samtykke
    samtykker: Samtykke[] | undefined;
    samtykkeRestStatus: REST_STATUS;

    // Nedetid state
    nedetid: undefined | NedetidResponse;

    // HarNyligInnsendteSoknader state
    harNyligInnsendteSoknader: undefined | HarNyligInnsendteSoknaderResponse;

    pabegynteSoknader: PabegynteSoknaderResponse[];
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

export interface TilgangResponse {
    harTilgang: boolean;
    sperrekode: TilgangSperrekode;
}

export type TilgangSperrekode = "pilot" | "bruker";

export interface NedetidResponse {
    isNedetid: boolean;
    isPlanlagtNedetid: boolean;
    nedetidStart: string;
    nedetidSlutt: string;
    nedetidStartText: string;
    nedetidSluttText: string;
}

export interface HarNyligInnsendteSoknaderResponse {
    antallNyligInnsendte: number;
}

export interface PabegynteSoknaderResponse {
    behandlingsId: string;
    sistOppdatert: string;
}
