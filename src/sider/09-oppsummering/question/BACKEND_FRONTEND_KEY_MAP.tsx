import {DigisosLanguageKey} from "../../../lib/i18n/common.ts";
export const BACKEND_FRONTEND_KEY_MAP: Record<string, DigisosLanguageKey> = {
    "arbeidsforhold.infotekst": "arbeidsforhold.infotekst_del1",
    "begrunnelse.hva.sporsmal": "begrunnelse.hva.label",
    "begrunnelse.hvorfor.sporsmal": "begrunnelse.hvorfor.label",
    "dinsituasjon.studerer.false": "avbryt.nei",
    "dinsituasjon.studerer.true": "arbeid.dinsituasjon.student.stringValue",
    "dinsituasjon.studerer.true.grad.deltid": "dinsituasjon.studerer.grad.deltid",
    "dinsituasjon.studerer.true.grad.heltid": "dinsituasjon.studerer.grad.heltid",
    "dinsituasjon.studerer.true.grad.sporsmal": "dinsituasjon.studerer.grad.sporsmal",
    "familie.sivilstatus.gift.ektefelle.borsammen.false": "avbryt.nei",
    "familie.sivilstatus.gift.ektefelle.borsammen.true": "avbryt.ja",
    "inntekt.bankinnskudd.true.type.annet": "formue.type.annet",
    "inntekt.bankinnskudd.true.type.annet.true.beskrivelse.label": "formue.annetLabel",
    "inntekt.bankinnskudd.true.type.brukskonto": "formue.type.brukskonto",
    "inntekt.bankinnskudd.true.type.bsu": "formue.type.bsu",
    "inntekt.bankinnskudd.true.type.livsforsikringssparedel": "formue.type.livsforsikringssparedel",
    "inntekt.bankinnskudd.true.type.sparekonto": "formue.type.sparekonto",
    "inntekt.bankinnskudd.true.type.sporsmal": "formue.type.sporsmal",
    "inntekt.bankinnskudd.true.type.verdipapirer": "formue.type.verdipapirer",
    "inntekt.bostotte.sak": "inntekt.bostotte.sak.stringValue",
    "inntekt.bostotte.sporsmal.false": "avbryt.nei",
    "inntekt.bostotte.sporsmal.true": "avbryt.ja",
    "inntekt.bostotte.utbetaling": "inntekt.bostotte.utbetaling.stringValue",
    "inntekt.eierandeler.false": "avbryt.nei",
    "inntekt.eierandeler.true": "avbryt.ja",
    "inntekt.eierandeler.true.type.annet": "formue.type.annet",
    "inntekt.inntekter.false": "avbryt.nei",
    "inntekt.inntekter.true": "avbryt.ja",
    "inntekt.inntekter.true.type.annet": "inntekt.inntekter.true.type.annet.stringValue",
    "inntekt.studielan.false": "avbryt.nei",
    "inntekt.studielan.true": "avbryt.ja",
    "json.okonomi.null": "formue.annetLabel",
    "json.okonomi.opplysninger.arbeid.avsluttet": "backendCompat.jsonOkonomiOpplysningerArbeidAvsluttet",
    "json.okonomi.opplysninger.arbeid.jobb": "backendCompat.jsonOkonomiOpplysningerArbeidJobb",
    "json.okonomi.opplysninger.arbeid.student": "inntekt.studielan.tittel",
    "json.okonomi.opplysninger.familiesituasjon.barnebidrag.mottar": "familie.barn.true.barnebidrag.mottar",
    "json.okonomi.opplysninger.inntekt.bankinnskudd.aksjer": "formue.type.aksjer",
    "json.okonomi.opplysninger.inntekt.bankinnskudd.annet": "formue.type.annet",
    "json.okonomi.opplysninger.inntekt.bankinnskudd.brukskonto": "formue.type.brukskonto",
    "json.okonomi.opplysninger.inntekt.bankinnskudd.bsu": "formue.type.bsu",
    "json.okonomi.opplysninger.inntekt.bankinnskudd.livsforsikring": "formue.type.livsforsikring",
    "json.okonomi.opplysninger.inntekt.bankinnskudd.sparekonto": "formue.type.sparekonto",
    "json.okonomi.opplysninger.inntekt.inntekter.annet": "inntekt.inntekter.tittel",
    "json.okonomi.opplysninger.inntekt.inntekter.forsikringsutbetalinger":
        "inntekt.inntekter.true.type.forsikringsutbetalinger",
    "json.okonomi.opplysninger.inntekt.inntekter.salg": "inntekt.inntekter.true.type.salg",
    "json.okonomi.opplysninger.inntekt.inntekter.utbytte": "inntekt.inntekter.true.type.utbytte",
    "json.okonomi.opplysninger.utgifter.barn.annet": "utgifter.barn.typer.annet",
    "json.okonomi.opplysninger.utgifter.barn.barnehage": "utgifter.barn.typer.barnehage",
    "json.okonomi.opplysninger.utgifter.barn.fritidsaktivitet": "utgifter.barn.typer.fritidsaktivitet",
    "json.okonomi.opplysninger.utgifter.barn.sfo": "utgifter.barn.typer.sfo",
    "json.okonomi.opplysninger.utgifter.barn.tannbehandling": "utgifter.barn.typer.tannbehandling",
    "json.okonomi.opplysninger.utgifter.boutgift.andreutgifter":
        "utgifter.boutgift.true.type.andreutgifter.stringValue",
    "json.okonomi.opplysninger.utgifter.boutgift.avdraglaan.boliglanAvdrag": "utgifter.boutgift.true.type.boliglan",
    "json.okonomi.opplysninger.utgifter.boutgift.avdraglaan.boliglanRenter": "utgifter.boutgift.true.type.boliglan",
    "json.okonomi.opplysninger.utgifter.boutgift.husleie": "utgifter.boutgift.true.type.husleie",
    "json.okonomi.opplysninger.utgifter.boutgift.kommunaleavgifter": "utgifter.boutgift.true.type.kommunaleavgifter",
    "json.okonomi.opplysninger.utgifter.boutgift.oppvarming": "utgifter.boutgift.true.type.oppvarming",
    "json.okonomi.opplysninger.utgifter.boutgift.strom": "utgifter.boutgift.true.type.strom",
    "system.familie.barn.true.barn.folkeregistrertsammen.false": "avbryt.nei",
    "system.familie.barn.true.barn.folkeregistrertsammen.true": "avbryt.ja",
    "system.familie.barn.true.barn.deltbosted.false": "avbryt.nei",
    "system.familie.barn.true.barn.deltbosted.true": "avbryt.ja",
    "system.familie.sivilstatus.gift.ektefelle.folkeregistrertsammen.false": "avbryt.nei",
    "system.familie.sivilstatus.gift.ektefelle.folkeregistrertsammen.true": "avbryt.ja",
    "utgifter.barn.false": "avbryt.nei",
    "utgifter.barn.true": "avbryt.ja",
    "utgifter.barn.true.utgifter.annenBarneutgift": "utgifter.barn.typer.annet",
    "utgifter.barn.true.utgifter.barnFritidsaktiviteter": "utgifter.barn.typer.fritidsaktivitet",
    "utgifter.barn.true.utgifter.barnTannregulering": "utgifter.barn.typer.tannregulering",
    "utgifter.barn.true.utgifter.barnehage": "utgifter.barn.typer.barnehage",
    "utgifter.barn.true.utgifter.sfo": "utgifter.barn.typer.sfo",
    "utgifter.barn.true.utgifter.sporsmal": "utgifter.barn.sporsmal",
    "utgifter.boutgift.false": "avbryt.nei",
    "utgifter.boutgift.true": "avbryt.ja",
    "utgifter.boutgift.true.type.annenBoutgift": "utgifter.boutgift.true.type.annenBoutgift.stringValue",
    "bosituasjon.annet.botype.foreldre": "bosituasjon.annenBotype.foreldre",
    "bosituasjon.annet.botype.familie": "bosituasjon.annenBotype.familie",
    "bosituasjon.annet.botype.venner": "bosituasjon.annenBotype.venner",
    "bosituasjon.annet.botype.institusjon": "bosituasjon.annenBotype.institusjon",
    "bosituasjon.annet.botype.fengsel": "bosituasjon.annenBotype.fengsel",
    "bosituasjon.annet.botype.krisesenter": "bosituasjon.annenBotype.krisesenter",
} as const;
