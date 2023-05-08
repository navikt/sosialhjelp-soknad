import {OpplysningSpc, VedleggGruppe} from "./opplysningerTypes";
export const opplysningsRekkefolgeOgSpc: OpplysningSpc[] = [
    {
        type: "lonnslipp|arbeid",
        antallRader: "flere",
        radInnhold: ["brutto", "netto"],
        textKey: "opplysninger.arbeid.jobb",
    },
    {
        type: "sluttoppgjor|arbeid",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.arbeid.avsluttet",
    }, // RADER_MED_BRUTTO_OG_NETTO
    {
        type: "student|vedtak",
        antallRader: "en",
        radInnhold: ["belop"],
        textKey: "opplysninger.arbeid.student",
    }, // RAD_MED_BELOP
    {
        type: "barnebidrag|betaler",
        antallRader: "en",
        radInnhold: ["belop"],
        textKey: "opplysninger.familiesituasjon.barnebidrag.betaler",
    }, // RAD_MED_BELOP
    {
        type: "barnebidrag|mottar",
        antallRader: "en",
        radInnhold: ["belop"],
        textKey: "opplysninger.familiesituasjon.barnebidrag.mottar",
    }, // RAD_MED_BELOP
    {
        type: "samvarsavtale|barn",
        antallRader: "ingen",
        radInnhold: [],
        textKey: "opplysninger.familiesituasjon.barn.samvarsavtale",
    }, // NOTHING
    {
        type: "husleiekontrakt|husleiekontrakt",
        antallRader: "ingen",
        radInnhold: [],
        textKey: "opplysninger.bosituasjon.leier",
    }, // NOTHING
    {
        type: "husleiekontrakt|kommunal",
        antallRader: "ingen",
        radInnhold: [],
        textKey: "opplysninger.bosituasjon.kommunal",
    }, // NOTHING
    {
        type: "husbanken|vedtak",
        antallRader: "en",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.bostotte",
    }, // RAD_MED_BELOP
    {
        type: "kontooversikt|brukskonto",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.brukskonto",
    }, // RADER_MED_BELOP
    {
        type: "kontooversikt|bsu",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.bsu",
    }, // RADER_MED_BELOP
    {
        type: "kontooversikt|sparekonto",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.sparekonto",
    }, // RADER_MED_BELOP
    {
        type: "kontooversikt|livsforsikring",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.livsforsikring",
    }, // RADER_MED_BELOP
    {
        type: "kontooversikt|aksjer",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.aksjer",
    }, // RADER_MED_BELOP
    {
        type: "kontooversikt|annet",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.annet",
    }, // RADER_MED_BELOP
    {
        type: "dokumentasjon|utbytte",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.inntekter.utbytte",
    }, // RADER_MED_BELOP
    {
        type: "salgsoppgjor|eiendom",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.inntekter.salg",
    }, // RADER_MED_BELOP
    {
        type: "dokumentasjon|forsikringsutbetaling",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.inntekter.forsikringsutbetalinger",
    }, // RADER_MED_BELOP
    {
        type: "dokumentasjon|annetinntekter",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.inntekter.annet",
    }, // RADER_MED_BELOP
    {
        type: "faktura|husleie",
        antallRader: "en",
        radInnhold: ["belop"],
        textKey: "opplysninger.utgifter.boutgift.husleie",
    }, // RAD_MED_BELOP
    {
        type: "faktura|strom",
        antallRader: "en",
        radInnhold: ["belop"],
        textKey: "opplysninger.utgifter.boutgift.strom",
    }, // RAD_MED_BELOP
    {
        type: "faktura|kommunaleavgifter",
        antallRader: "en",
        radInnhold: ["belop"],
        textKey: "opplysninger.utgifter.boutgift.kommunaleavgifter",
    }, // RAD_MED_BELOP
    {
        type: "faktura|oppvarming",
        antallRader: "en",
        radInnhold: ["belop"],
        textKey: "opplysninger.utgifter.boutgift.oppvarming",
    }, // RAD_MED_BELOP
    {
        type: "nedbetalingsplan|avdraglaan",
        antallRader: "flere",
        radInnhold: ["avdrag", "renter"],
        textKey: "opplysninger.utgifter.boutgift.avdraglaan",
    }, // RADER_MED_AVDRAG_OG_RENTER
    {
        type: "dokumentasjon|annetboutgift",
        antallRader: "flere",
        radInnhold: ["beskrivelse", "belop"],
        textKey: "opplysninger.utgifter.boutgift.andreutgifter",
    }, // RADER_MED_BESKRIVELSE_OG_BELOP
    {
        type: "faktura|fritidsaktivitet",
        antallRader: "flere",
        radInnhold: ["beskrivelse", "belop"],
        textKey: "opplysninger.utgifter.barn.fritidsaktivitet",
    }, // RADER_MED_BESKRIVELSE_OG_BELOP
    {
        type: "faktura|barnehage",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.utgifter.barn.barnehage",
    }, // RADER_MED_BELOP
    {
        type: "faktura|sfo",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.utgifter.barn.sfo",
    }, // RADER_MED_BELOP
    {
        type: "faktura|tannbehandling",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.utgifter.barn.tannbehandling",
    }, // RADER_MED_BELOP
    {
        type: "faktura|annetbarnutgift",
        antallRader: "flere",
        radInnhold: ["beskrivelse", "belop"],
        textKey: "opplysninger.utgifter.barn.annet",
    }, // RADER_MED_BESKRIVELSE_OG_BELOP
    {
        type: "skattemelding|skattemelding",
        antallRader: "ingen",
        radInnhold: [],
        textKey: "opplysninger.generell.skattemelding",
    }, // NOTHING
    {
        type: "oppholdstillatel|oppholdstillatel",
        antallRader: "ingen",
        radInnhold: [],
        textKey: "opplysninger.oppholdstillatelse.oppholdstillatelse",
    }, // INGEN
    {
        type: "annet|annet",
        antallRader: "flere",
        radInnhold: ["beskrivelse", "belop"],
        textKey: "opplysninger.ekstrainfo.utgifter",
    }, // RADER_MED_BESKRIVELSE_OG_BELOP
];

export const vedleggGrupper: VedleggGruppe[] = [
    "statsborgerskap",
    "arbeid",
    "familie",
    "bosituasjon",
    "inntekt",
    "utgifter",
    "generelle vedlegg",
    "andre utgifter",
];
