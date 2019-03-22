// public List<VedleggFrontend> okonomiskeOpplysninger;
// public List<VedleggFrontend> slettedeVedlegg;

export interface OkonomiskeOpplysninger {
    "okonomiskeOpplysninger": Vedlegg[];
    "slettedeVedlegg": Vedlegg[];
}


// public String type;
// public String gruppe;
// public List<VedleggRadFrontend> rader;
// public String vedleggStatus;
// public List<FilFrontend> filer;
export interface Vedlegg {
    "type": VedleggType;
    "gruppe": GruppeEnum;
    "rader": VedleggRad[];
    "vedleggStatus": string;
    "filer": Fil[]
}


// public String beskrivelse;
// public Integer belop;
// public Integer avdrag;
// public Integer renter;
export interface VedleggRad {
    "beskrivelse": string;
    "belop": number;
    "avdrag": number;
    "renter": number;
}


// public String filNavn;
// public String uuid;
export interface Fil {
    "filNavn": string;
    "uuid": string;
}

export enum GruppeEnum {
    ARBEID = "arbeid",
    FAMILIE = "familie",
    BOSITUASJON = "bosituasjon",
    INNTEKT = "inntekt",
    UTGIFTER = "utgifter",
    GENERELLE_VEDLEGG = "generelle vedlegg",
    ANDRE_UTGIFTER = "andre utgifter"
}

export enum VedleggType {
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

export enum RadType {
    RAD_MED_BELOP = "RadMedBelop",
    RADER_MED_BELOP = "RaderMedBelop",
    RADER_MED_BRUTTO_OG_NETTO = "RaderMedBruttoOgNetto",
    RADER_MED_AVDRAG_OG_RENTER = "RaderMedAvdragOgRenter",
    RADER_MED_BESKRIVELSE_OG_BELOP = "RaderMedBeskrivelseOgBelop",
    NOTHING = "nothing"
}


export interface Struktur {
    "gruppeArbeid" : GruppeArbeid;
    "gruppeFamilie" : GruppeFamilie;
    "gruppeBosituasjon" : GruppeBosituasjon;
    "gruppeInntekt" : GruppeInntekt;
    "gruppeUtgifter" : GruppeUtgifter;
    "gruppeGenerelleVedlegg" : GruppeGenerelleVedlegg;
    "gruppeAndreUtgifter" : GruppeAndreUtgifter;
}

export interface GruppeArbeid {
    "lonnslipp|arbeid" : MaybeOpplysningStruktur;
    "sluttoppgjor|arbeid" : MaybeOpplysningStruktur;
    "student|vedtak" : MaybeOpplysningStruktur;
}

export interface GruppeFamilie {
    "barnebidrag|betaler" : MaybeOpplysningStruktur;
    "barnebidrag|mottar" : MaybeOpplysningStruktur;
    "samvarsavtale|barn" : MaybeOpplysningStruktur;
}

export interface GruppeBosituasjon {
    "husleiekontrakt|husleiekontrakt" : MaybeOpplysningStruktur;
    "husleiekontrakt|kommunal" : MaybeOpplysningStruktur;
}

export interface GruppeInntekt {
    "bostotte|vedtak" : MaybeOpplysningStruktur; // - {belop}
    "kontooversikt|brukskonto" : MaybeOpplysningStruktur; //- [{belop}, ...]
    "kontooversikt|bsu" : MaybeOpplysningStruktur; //- [{belop}, ...]
    "kontooversikt|sparekonto" : MaybeOpplysningStruktur; //- [{belop}, ...]
    "kontooversikt|livsforsikring" : MaybeOpplysningStruktur; //- [{belop}, ...]
    "kontooversikt|aksjer" : MaybeOpplysningStruktur; //- [{belop}, ...]
    "kontooversikt|annet" : MaybeOpplysningStruktur; //- [{belop}, ...]
    "dokumentasjon|utbytte" : MaybeOpplysningStruktur; //- [{belop}, ...]
    "salgsoppgjor|eiendom" : MaybeOpplysningStruktur; //- [{belop}, ...]
    "dokumentasjon|forsikringsutbetaling" : MaybeOpplysningStruktur; //- [{belop}, ...]
    "dokumentasjon|annetinntekter" : MaybeOpplysningStruktur; //- [{belop}, ...]
}

export interface GruppeUtgifter {
    "faktura|husleie" : MaybeOpplysningStruktur;// - {belop}
    "faktura|strom" : MaybeOpplysningStruktur;// - {belop}
    "faktura|kommunaleavgifter" : MaybeOpplysningStruktur;// - {belop}
    "faktura|oppvarming" : MaybeOpplysningStruktur;// - {belop}
    "nedbetalingsplan|avdraglaan" : MaybeOpplysningStruktur;// - [{avdrag, renter}, ...]
    "dokumentasjon|annetboutgift" : MaybeOpplysningStruktur;// - [{beskrivelse, belop}, ...]
    "faktura|fritidsaktivitet" : MaybeOpplysningStruktur;// - [{beskrivelse, belop}, ...]
    "faktura|barnehage" : MaybeOpplysningStruktur;// - [{belop}, ...]
    "faktura|sfo" : MaybeOpplysningStruktur;// - [{belop}, ...]
    "faktura|tannbehandling" : MaybeOpplysningStruktur;// - [{belop}, ...]
    "faktura|annetbarnutgift" : MaybeOpplysningStruktur;// - [{beskrivelse, belop}, ...]
    "annet|annet" : MaybeOpplysningStruktur;// - [{beskrivelse, belop}, ...]
}

export interface GruppeGenerelleVedlegg {
    "skattemelding|skattemelding" : MaybeOpplysningStruktur;  //- nothing
}

export interface GruppeAndreUtgifter {
    "annet|annet" : MaybeOpplysningStruktur;//- [{beskrivelse, belop}, ...]
}

export type MaybeOpplysningStruktur
    = null
    | VedleggBeriket

export interface VedleggBeriket {
    "type" : string;
    "gruppe" : GruppeEnum | null;
    "rader" : VedleggRad[];
    "vedleggStatus": string;
    "filer" : Fil[];
    "slettet" : boolean;
    "radType" : RadType;
}


export enum VedleggStatus {
    VEDLEGG_KREVES = "VedleggKreves"
}


// --------------------------------------
// RADER
// --------------------------------------
export type RaderStruktur
    = {}
    | RadMedBeloep
    | RaderMedBeloep
    | RaderMedBruttoOgNetto
    | RaderMedAvdragOgRenter
    | RaderMedBeskrivelseOgBeloep;

export interface RadMedBeloep {
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

export interface RadMedBeskrivelseOgBeloep {
    "beskrivelse" : string;
    "beloep" : number;
}

export interface RaderMedBeloep {
    "rader" : RadMedBeloep[];
}

export interface RaderMedBruttoOgNetto {
    "rader" : RadMedBruttoOgNetto;
}

export interface RaderMedAvdragOgRenter {
    "rader" : RadMedAvdragOgRenter;
}

export interface RaderMedBeskrivelseOgBeloep {
    "rader" : RadMedBeskrivelseOgBeloep;
}
// --------------------------------------




// const okonomiskeFaktumKeys = [
//     "dinsituasjon.jobb",
//     "dinsituasjon.studerer",
//     "familie.barn.true.barnebidrag",
//     "bosituasjon",
//     "inntekt.bostotte",
//     "inntekt.eierandeler.true.type.bolig",
//     "inntekt.eierandeler.true.type.kjoretoy",
//     "inntekt.eierandeler.true.type.campingvogn",
//     "inntekt.eierandeler.true.type.fritidseiendom",
//     "inntekt.eierandeler.true.type.annet",
//     "inntekt.bankinnskudd.true.type.brukskonto",
//     "inntekt.bankinnskudd.true.type.bsu",
//     "inntekt.bankinnskudd.true.type.sparekonto",
//     "inntekt.bankinnskudd.true.type.livsforsikring",
//     "inntekt.bankinnskudd.true.type.aksjer",
//     "inntekt.bankinnskudd.true.type.annet",
//     "inntekt.inntekter.true.type.utbytte",
//     "inntekt.inntekter.true.type.salg",
//     "inntekt.inntekter.true.type.forsikringsutbetalinger",
//     "inntekt.inntekter.true.type.annet",
//     "utgifter.boutgift.true.type.husleie",
//     "utgifter.boutgift.true.type.strom",
//     "utgifter.boutgift.true.type.kommunaleavgifter",
//     "utgifter.boutgift.true.type.oppvarming",
//     "utgifter.boutgift.true.type.avdraglaan",
//     "utgifter.boutgift.true.type.andreutgifter",
//     "utgifter.barn.true.utgifter.fritidsaktivitet",
//     "utgifter.barn.true.utgifter.barnehage",
//     "utgifter.barn.true.utgifter.sfo",
//     "utgifter.barn.true.utgifter.tannbehandling",
//     "utgifter.barn.true.utgifter.annet"
// ];