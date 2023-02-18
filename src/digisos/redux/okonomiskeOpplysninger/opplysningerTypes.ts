import {Valideringsfeil} from "../validering/valideringActionTypes";
import {REST_STATUS} from "../soknadsdata/soknadsdataTypes";

export interface OpplysningerModel {
    restStatus: REST_STATUS;
    backendData: OpplysningerBackend | null;
    opplysningerSortert: Opplysning[];
    enFilLastesOpp: boolean;
}

export type MaybeOpplysning = Opplysning | null;

export interface OpplysningerBackend {
    okonomiskeOpplysninger: OpplysningBackend[];
    slettedeVedlegg: OpplysningBackend[];
    isOkonomiskeOpplysningerBekreftet: boolean;
}

export interface OpplysningBackend {
    type: OpplysningType;
    gruppe: OpplysningGruppe;
    rader: OpplysningRad[];
    vedleggStatus: VedleggStatus;
    filer: Fil[];
}

export interface Opplysning {
    type: OpplysningType;
    gruppe: OpplysningGruppe | null;
    rader: OpplysningRad[];
    vedleggStatus: VedleggStatus;
    filer: Fil[];
    slettet: boolean;
    radInnhold: InputType[];
    pendingLasterOppFil: boolean;
}

export interface OpplysningSpc {
    type: OpplysningType;
    antallRader: AntallRader;
    radInnhold: InputType[];
    textKey: string;
}

export enum AntallRader {
    INGEN = "ingen",
    EN = "en",
    FLERE = "flere",
}

export type OpplysningerAction =
    | GotDataFromBackend
    | UpdateOpplysning
    | SettPendingPaFilOpplasting
    | SettFerdigPaFilOpplasting
    | SettOpplysningsFilAlleredeLastetOpp
    | LagreOpplysningHvisGyldig;

export enum opplysningerActionTypeKeys {
    GOT_DATA_FROM_BACKEND = "okonomiskeOpplysninger/GOT_DATA_FROM_BACKEND",
    OPPDATER_OPPLYSNING = "okonomiskeOpplysninger/OPPDATER_OPPLYSNING",
    SETT_FIL_OPPLASTING_PENDING = "okonomiskeOpplysninger/SETT_FIL_OPPLASTING_PENDING",
    SETT_FIL_OPPLASTING_FERDIG = "okonomiskeOpplysninger/SETT_FIL_OPPLASTING_FERDIG",
    SETT_OPPLYSNINGS_FIL_ALLEREDE_LASTET_OPP = "okonomiskeOpplysninger/SETT_OPPLYSNINGS_FIL_ALLEREDE_LASTET_OPP",
    LAGRE_OPPLYSNING_HVIS_GYLDIG = "okonomiskeOpplysninger/LAGRE_OPPLYSNING_HVIS_GYLDIG",
}

export interface UpdateOpplysning {
    type: opplysningerActionTypeKeys.OPPDATER_OPPLYSNING;
    opplysning: Opplysning;
}

export interface GotDataFromBackend {
    type: opplysningerActionTypeKeys.GOT_DATA_FROM_BACKEND;
    backendData: OpplysningerBackend;
}

export interface SettPendingPaFilOpplasting {
    type: opplysningerActionTypeKeys.SETT_FIL_OPPLASTING_PENDING;
    opplysningType: OpplysningType;
}

export interface SettFerdigPaFilOpplasting {
    type: opplysningerActionTypeKeys.SETT_FIL_OPPLASTING_FERDIG;
    opplysningType: OpplysningType;
}

export interface SettOpplysningsFilAlleredeLastetOpp {
    type: opplysningerActionTypeKeys.SETT_OPPLYSNINGS_FIL_ALLEREDE_LASTET_OPP;
    opplysningType: OpplysningType;
}

export interface LagreOpplysningHvisGyldig {
    type: opplysningerActionTypeKeys.LAGRE_OPPLYSNING_HVIS_GYLDIG;
    behandlingsId: string;
    opplysning: Opplysning;
    feil: Valideringsfeil[];
}

export enum OpplysningGruppe {
    STATSBORGERSKAP = "statsborgerskap",
    ARBEID = "arbeid",
    FAMILIE = "familie",
    BOSITUASJON = "bosituasjon",
    INNTEKT = "inntekt",
    UTGIFTER = "utgifter",
    GENERELLE_VEDLEGG = "generelle vedlegg",
    ANDRE_UTGIFTER = "andre utgifter",
    UKJENT = "ukjent",
}

export enum OpplysningType {
    LONNSLIPP_ARBEID = "lonnslipp|arbeid", // RADER_MED_BRUTTO_OG_NETTO
    SLUTTOPPGJOR_ARBEID = "sluttoppgjor|arbeid", // RADER_MED_BRUTTO_OG_NETTO
    STUDENT_VEDTAK = "student|vedtak", // RAD_MED_BELOP
    BARNEBIDRAG_BETALER = "barnebidrag|betaler", // RAD_MED_BELOP
    BARNEBIDRAG_MOTTAR = "barnebidrag|mottar", // RAD_MED_BELOP
    SAMVARSAVTALE_BARN = "samvarsavtale|barn", // NOTHING
    HUSLEIEKONTRAKT_HUSLEIEKONTRAKT = "husleiekontrakt|husleiekontrakt", // NOTHING
    HUSLEIEKONTRAKT_KOMMUNAL = "husleiekontrakt|kommunal", // NOTHING
    BOSTOTTE_VEDTAK = "husbanken|vedtak", // RAD_MED_BELOP
    KONTOOVERSIKT_BRUKSKONTO = "kontooversikt|brukskonto", // RADER_MED_BELOP
    KONTOOVERSIKT_BSU = "kontooversikt|bsu", // RADER_MED_BELOP
    KONTOOVERSIKT_SPAREKONTO = "kontooversikt|sparekonto", // RADER_MED_BELOP
    KONTOOVERSIKT_LIVSFORSIKRING = "kontooversikt|livsforsikring", // RADER_MED_BELOP
    KONTOOVERSIKT_AKSJER = "kontooversikt|aksjer", // RADER_MED_BELOP
    KONTOOVERSIKT_ANNET = "kontooversikt|annet", // RADER_MED_BELOP
    DOKUMENTASJON_UTBYTTE = "dokumentasjon|utbytte", // RADER_MED_BELOP
    SALGSOPPGJOR_EIENDOM = "salgsoppgjor|eiendom", // RADER_MED_BELOP
    DOKUMENTASJON_FORSIKRINGSUTBETALING = "dokumentasjon|forsikringsutbetaling", // RADER_MED_BELOP
    DOKUMENTASJON_ANNETINNTEKTER = "dokumentasjon|annetinntekter", // RADER_MED_BELOP
    FAKTURA_HUSLEIE = "faktura|husleie", // RAD_MED_BELOP
    FAKTURA_STROM = "faktura|strom", // RAD_MED_BELOP
    FAKTURA_KOMMUNALEAVGIFTER = "faktura|kommunaleavgifter", // RAD_MED_BELOP
    FAKTURA_OPPVARMING = "faktura|oppvarming", // RAD_MED_BELOP
    NEDBETALINGSPLAN_AVDRAGLAAN = "nedbetalingsplan|avdraglaan", // RADER_MED_AVDRAG_OG_RENTER
    DOKUMENTASJON_ANNETBOUTGIFT = "dokumentasjon|annetboutgift", // RADER_MED_BESKRIVELSE_OG_BELOP
    FAKTURA_FRITIDSAKTIVITET = "faktura|fritidsaktivitet", // RADER_MED_BESKRIVELSE_OG_BELOP
    FAKTURA_BARNEHAGE = "faktura|barnehage", // RADER_MED_BELOP
    FAKTURA_SFO = "faktura|sfo", // RADER_MED_BELOP
    FAKTURA_TANNBEHANDLING = "faktura|tannbehandling", // RADER_MED_BELOP
    FAKTURA_ANNETBARNUTGIFT = "faktura|annetbarnutgift", // RADER_MED_BESKRIVELSE_OG_BELOP
    SKATTEMELDING_SKATTEMELDING = "skattemelding|skattemelding", // NOTHING
    OPPHOLDSTILLATEL_OPPHOLDSTILLATEL = "oppholdstillatel|oppholdstillatel",
    ANNET_ANNET = "annet|annet", // RADER_MED_BESKRIVELSE_OG_BELOP
}

export enum VedleggStatus {
    VEDLEGGALLEREDESEND = "VedleggAlleredeSendt",
    VEDLEGG_KREVES = "VedleggKreves",
    LASTET_OPP = "LastetOpp",
}

export enum InputType {
    BESKRIVELSE = "beskrivelse",
    BELOP = "belop",
    BRUTTO = "brutto",
    NETTO = "netto",
    AVDRAG = "avdrag",
    RENTER = "renter",
}

export interface OpplysningRad {
    beskrivelse: string;
    belop: string;
    brutto: string;
    netto: string;
    avdrag: string;
    renter: string;
}

export interface Fil {
    filNavn: string;
    uuid: string;
}
