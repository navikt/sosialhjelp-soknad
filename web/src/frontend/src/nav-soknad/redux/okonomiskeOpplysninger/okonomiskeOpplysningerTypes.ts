import {RestStatus} from "../../types";
import {Valideringsfeil} from "../../validering/types";


// TYPES
export interface OkonomiskeOpplysningerModel {
    restStatus: RestStatus;
    backendData: OkonomiskeOpplysningerBackend | null;
    grupper: Grupper | null;
}

export interface OkonomiskeOpplysningerBackend {
    okonomiskeOpplysninger: OkonomiskOpplysningBackend[];
    slettedeVedlegg: OkonomiskOpplysningBackend[];
}

export interface OkonomiskOpplysningBackend {
    type: OpplysningType;
    gruppe: OpplysningGruppe;
    rader: OpplysningRad[];
    vedleggStatus: VedleggStatus;
    filer: Fil[]
}


export interface Opplysning {
    type: OpplysningType;
    gruppe: OpplysningGruppe | null;
    rader: OpplysningRad[];
    vedleggStatus: VedleggStatus;
    filer: Fil[];
    slettet: boolean;
    radType: RadType;
    pendingLasterOppFil: boolean;
}

export interface Grupper {
    gruppeArbeid: Opplysning[];
    gruppeFamilie: Opplysning[];
    gruppeBosituasjon: Opplysning[];
    gruppeInntekt: Opplysning[];
    gruppeUtgifter: Opplysning[];
    gruppeGenerelleVedlegg: Opplysning[];
    gruppeAndreUtgifter: Opplysning[];
    gruppeUkjent: Opplysning[];
}


// ACTION TYPES
export type OkonomiskeOpplysningerAction
    = GotDataFromBackend
    | UpdateOpplysning
    | SettPendingPaFilOpplasting
    | SettFerdigPaFilOpplasting
    | SettOpplysningsFilAlleredeLastetOpp
    | LagreOpplysningHvisGyldig

export enum OkonomiskeOpplysningerActionTypeKeys {
    GOT_DATA_FROM_BACKEND = "okonomiskeOpplysninger/GOT_DATA_FROM_BACKEND",
    OPPDATER_OKONOMISK_OPPLYSNING = "okonomiskeOpplysninger/OPPDATER_OKONOMISK_OPPLYSNING",
    SETT_PENDING_PA_FIL_OPPLASTING = "okonomiskeOpplysninger/SETT_PENDING_PA_FIL_OPPLASTING",
    SETT_FERDIG_PA_FIL_OPPLASTING = "okonomiskeOpplysninger/SETT_FERDIG_PA_FIL_OPPLASTING",
    SETT_OPPLYSNINGS_FIL_ALLEREDE_LASTET_OPP = "okonomiskeOpplysninger/SETT_OPPLYSNINGS_FIL_ALLEREDE_LASTET_OPP",
    LAGRE_OPPLYSNING_HVIS_GYLDIG = "okonomiskeOpplysninger/LAGRE_OPPLYSNING_HVIS_GYLDIG"
}

export interface UpdateOpplysning {
    type: OkonomiskeOpplysningerActionTypeKeys.OPPDATER_OKONOMISK_OPPLYSNING;
    okonomiskOpplysning: Opplysning;
}

export interface GotDataFromBackend {
    type: OkonomiskeOpplysningerActionTypeKeys.GOT_DATA_FROM_BACKEND;
    backendData: OkonomiskeOpplysningerBackend;
}

export interface SettPendingPaFilOpplasting {
    type: OkonomiskeOpplysningerActionTypeKeys.SETT_PENDING_PA_FIL_OPPLASTING;
    opplysningType: OpplysningType;
    opplysningGruppe: OpplysningGruppe;
}

export interface SettFerdigPaFilOpplasting {
    type: OkonomiskeOpplysningerActionTypeKeys.SETT_FERDIG_PA_FIL_OPPLASTING;
    opplysningType: OpplysningType;
    opplysningGruppe: OpplysningGruppe;
}

export interface SettOpplysningsFilAlleredeLastetOpp {
    type: OkonomiskeOpplysningerActionTypeKeys.SETT_OPPLYSNINGS_FIL_ALLEREDE_LASTET_OPP;
    opplysningType: OpplysningType;
    opplysningGruppe: OpplysningGruppe;
}

export interface LagreOpplysningHvisGyldig {
    type: OkonomiskeOpplysningerActionTypeKeys.LAGRE_OPPLYSNING_HVIS_GYLDIG;
    behandlingsId: string;
    opplysning: Opplysning;
    feil: Valideringsfeil[];
}




// MAPPING
export enum OpplysningGruppe {
    ARBEID = "arbeid",
    FAMILIE = "familie",
    BOSITUASJON = "bosituasjon",
    INNTEKT = "inntekt",
    UTGIFTER = "utgifter",
    GENERELLE_VEDLEGG = "generelle vedlegg",
    ANDRE_UTGIFTER = "andre utgifter",
    UKJENT = "ukjent"
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
    BOSTOTTE_VEDTAK = "bostotte|vedtak", // RAD_MED_BELOP
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
    ANNET_ANNET = "annet|annet", // RADER_MED_BESKRIVELSE_OG_BELOP
}

export enum VedleggStatus {
    LASTET_OPP = "LastetOpp",
    VEDLEGGALLEREDESEND = "VedleggAlleredeSendt",
    VEDLEGG_KREVES = "VedleggKreves"
}

export enum RadType {
    RAD_MED_BELOP = "RadMedBelop",
    RADER_MED_BELOP = "RaderMedBelop",
    RADER_MED_BRUTTO_OG_NETTO = "RaderMedBruttoOgNetto",
    RADER_MED_AVDRAG_OG_RENTER = "RaderMedAvdragOgRenter",
    RADER_MED_BESKRIVELSE_OG_BELOP = "RaderMedBeskrivelseOgBelop",
    NOTHING = "nothing"
}

export enum InputType {
    BESKRIVELSE = "beskrivelse",
    BELOP = "belop",
    BRUTTO = "brutto",
    NETTO = "netto",
    AVDRAG = "avdrag",
    RENTER = "renter"
}


export interface OpplysningRad {
    "beskrivelse": string;
    "belop": string;
    "brutto": string;
    "netto": string;
    "avdrag": string;
    "renter": string;
}

export interface Fil {
    "filNavn": string;
    "uuid": string;
}

export interface RadMedBelop {
    "beloep" : number;
}

export interface RadMedBruttoOgNetto {
    "brutto" : number;
    "netto" : number;
}

export interface RadMedAvdragOgRenter {
    "avdrag" : number;
    "renter" : number;
}

export interface RadMedBeskrivelseOgBelop {
    "beskrivelse" : string;
    "beloep" : number;
}

export interface RaderMedBelop {
    "rader" : RadMedBelop[];
}

export interface RaderMedBruttoOgNetto {
    "rader" : RadMedBruttoOgNetto;
}

export interface RaderMedAvdragOgRenter {
    "rader" : RadMedAvdragOgRenter;
}

export interface RaderMedBeskrivelseOgBelop {
    "rader" : RadMedBeskrivelseOgBelop;
}
// --------------------------------------

