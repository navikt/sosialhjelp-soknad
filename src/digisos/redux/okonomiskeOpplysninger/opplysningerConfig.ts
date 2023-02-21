import {AntallRader, InputType, VedleggGruppe, OpplysningSpc, OpplysningType} from "./opplysningerTypes";

export const opplysningsRekkefolgeOgSpc: OpplysningSpc[] = [
    {
        type: OpplysningType.LONNSLIPP_ARBEID,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BRUTTO, InputType.NETTO],
        textKey: "opplysninger.arbeid.jobb",
    },
    {
        type: OpplysningType.SLUTTOPPGJOR_ARBEID,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.arbeid.avsluttet",
    }, // RADER_MED_BRUTTO_OG_NETTO
    {
        type: OpplysningType.STUDENT_VEDTAK,
        antallRader: AntallRader.EN,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.arbeid.student",
    }, // RAD_MED_BELOP
    {
        type: OpplysningType.BARNEBIDRAG_BETALER,
        antallRader: AntallRader.EN,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.familiesituasjon.barnebidrag.betaler",
    }, // RAD_MED_BELOP
    {
        type: OpplysningType.BARNEBIDRAG_MOTTAR,
        antallRader: AntallRader.EN,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.familiesituasjon.barnebidrag.mottar",
    }, // RAD_MED_BELOP
    {
        type: OpplysningType.SAMVARSAVTALE_BARN,
        antallRader: AntallRader.INGEN,
        radInnhold: [],
        textKey: "opplysninger.familiesituasjon.barn.samvarsavtale",
    }, // NOTHING
    {
        type: OpplysningType.HUSLEIEKONTRAKT_HUSLEIEKONTRAKT,
        antallRader: AntallRader.INGEN,
        radInnhold: [],
        textKey: "opplysninger.bosituasjon.leier",
    }, // NOTHING
    {
        type: OpplysningType.HUSLEIEKONTRAKT_KOMMUNAL,
        antallRader: AntallRader.INGEN,
        radInnhold: [],
        textKey: "opplysninger.bosituasjon.kommunal",
    }, // NOTHING
    {
        type: OpplysningType.BOSTOTTE_VEDTAK,
        antallRader: AntallRader.EN,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.inntekt.bostotte",
    }, // RAD_MED_BELOP
    {
        type: OpplysningType.KONTOOVERSIKT_BRUKSKONTO,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.inntekt.bankinnskudd.brukskonto",
    }, // RADER_MED_BELOP
    {
        type: OpplysningType.KONTOOVERSIKT_BSU,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.inntekt.bankinnskudd.bsu",
    }, // RADER_MED_BELOP
    {
        type: OpplysningType.KONTOOVERSIKT_SPAREKONTO,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.inntekt.bankinnskudd.sparekonto",
    }, // RADER_MED_BELOP
    {
        type: OpplysningType.KONTOOVERSIKT_LIVSFORSIKRING,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.inntekt.bankinnskudd.livsforsikring",
    }, // RADER_MED_BELOP
    {
        type: OpplysningType.KONTOOVERSIKT_AKSJER,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.inntekt.bankinnskudd.aksjer",
    }, // RADER_MED_BELOP
    {
        type: OpplysningType.KONTOOVERSIKT_ANNET,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.inntekt.bankinnskudd.annet",
    }, // RADER_MED_BELOP
    {
        type: OpplysningType.DOKUMENTASJON_UTBYTTE,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.inntekt.inntekter.utbytte",
    }, // RADER_MED_BELOP
    {
        type: OpplysningType.SALGSOPPGJOR_EIENDOM,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.inntekt.inntekter.salg",
    }, // RADER_MED_BELOP
    {
        type: OpplysningType.DOKUMENTASJON_FORSIKRINGSUTBETALING,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.inntekt.inntekter.forsikringsutbetalinger",
    }, // RADER_MED_BELOP
    {
        type: OpplysningType.DOKUMENTASJON_ANNETINNTEKTER,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.inntekt.inntekter.annet",
    }, // RADER_MED_BELOP
    {
        type: OpplysningType.FAKTURA_HUSLEIE,
        antallRader: AntallRader.EN,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.utgifter.boutgift.husleie",
    }, // RAD_MED_BELOP
    {
        type: OpplysningType.FAKTURA_STROM,
        antallRader: AntallRader.EN,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.utgifter.boutgift.strom",
    }, // RAD_MED_BELOP
    {
        type: OpplysningType.FAKTURA_KOMMUNALEAVGIFTER,
        antallRader: AntallRader.EN,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.utgifter.boutgift.kommunaleavgifter",
    }, // RAD_MED_BELOP
    {
        type: OpplysningType.FAKTURA_OPPVARMING,
        antallRader: AntallRader.EN,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.utgifter.boutgift.oppvarming",
    }, // RAD_MED_BELOP
    {
        type: OpplysningType.NEDBETALINGSPLAN_AVDRAGLAAN,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.AVDRAG, InputType.RENTER],
        textKey: "opplysninger.utgifter.boutgift.avdraglaan",
    }, // RADER_MED_AVDRAG_OG_RENTER
    {
        type: OpplysningType.DOKUMENTASJON_ANNETBOUTGIFT,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BESKRIVELSE, InputType.BELOP],
        textKey: "opplysninger.utgifter.boutgift.andreutgifter",
    }, // RADER_MED_BESKRIVELSE_OG_BELOP
    {
        type: OpplysningType.FAKTURA_FRITIDSAKTIVITET,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BESKRIVELSE, InputType.BELOP],
        textKey: "opplysninger.utgifter.barn.fritidsaktivitet",
    }, // RADER_MED_BESKRIVELSE_OG_BELOP
    {
        type: OpplysningType.FAKTURA_BARNEHAGE,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.utgifter.barn.barnehage",
    }, // RADER_MED_BELOP
    {
        type: OpplysningType.FAKTURA_SFO,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.utgifter.barn.sfo",
    }, // RADER_MED_BELOP
    {
        type: OpplysningType.FAKTURA_TANNBEHANDLING,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BELOP],
        textKey: "opplysninger.utgifter.barn.tannbehandling",
    }, // RADER_MED_BELOP
    {
        type: OpplysningType.FAKTURA_ANNETBARNUTGIFT,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BESKRIVELSE, InputType.BELOP],
        textKey: "opplysninger.utgifter.barn.annet",
    }, // RADER_MED_BESKRIVELSE_OG_BELOP
    {
        type: OpplysningType.SKATTEMELDING_SKATTEMELDING,
        antallRader: AntallRader.INGEN,
        radInnhold: [],
        textKey: "opplysninger.generell.skattemelding",
    }, // NOTHING
    {
        type: OpplysningType.OPPHOLDSTILLATEL_OPPHOLDSTILLATEL,
        antallRader: AntallRader.INGEN,
        radInnhold: [],
        textKey: "opplysninger.oppholdstillatelse.oppholdstillatelse",
    }, // INGEN
    {
        type: OpplysningType.ANNET_ANNET,
        antallRader: AntallRader.FLERE,
        radInnhold: [InputType.BESKRIVELSE, InputType.BELOP],
        textKey: "opplysninger.ekstrainfo.utgifter",
    }, // RADER_MED_BESKRIVELSE_OG_BELOP
];

export const vedleggGrupper: VedleggGruppe[] = [
    VedleggGruppe.STATSBORGERSKAP,
    VedleggGruppe.ARBEID,
    VedleggGruppe.FAMILIE,
    VedleggGruppe.BOSITUASJON,
    VedleggGruppe.INNTEKT,
    VedleggGruppe.UTGIFTER,
    VedleggGruppe.GENERELLE_VEDLEGG,
    VedleggGruppe.ANDRE_UTGIFTER,
];
