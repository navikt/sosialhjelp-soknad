import type {FlatLanguageFile} from "./types.ts";

const OBSOLETE_KEYS = [
    "utbetalinger.skattbar.kontaktproblemer.oppsummering",
    "utbetalinger.inntekt.skattbar.gi_samtykke.true",
    "utbetalinger.inntekt.skattbar.gi_samtykke.false",
    "avbryt",
    "inntekt.bostotte.husbanken.mottaker",
    "inntekt.bostotte.husbanken.status",
    "inntekt.bostotte.husbanken.vedtaksstatus",
    "inntekt.bostotte.sak",
    "kontakt.system.personalia.statsborgerskap.sporsmal",
    "opplysninger.ekstrainfo.utgifter.beskrivelse.pattern",
    "applikasjon.sidetittel.kortnavn",
    "utgifter.barn.typer.annet.true.beskrivelse.label",
    "bosituasjon.annet.true.botype.familie",
    "bosituasjon.annet.true.botype.venner",
] as (keyof FlatLanguageFile)[];

export const deleteObsoleteKeys = (original: FlatLanguageFile): FlatLanguageFile => {
    OBSOLETE_KEYS.map((key) => delete original[key as keyof FlatLanguageFile]);
    Object.entries(original).forEach(([key, value]) => {
        if (key.endsWith("true") && ["Ja", "Yes"].includes(value)) delete original[key as keyof FlatLanguageFile];
        if (key.endsWith("false") && ["Nei", "No"].includes(value)) delete original[key as keyof FlatLanguageFile];
    });
    return original;
};
