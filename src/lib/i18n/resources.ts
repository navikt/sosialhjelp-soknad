import dokumentasjonEn from "../../locales/en/dokumentasjon.ts";
import skjemaEn from "../../locales/en/skjema.ts";
import dokumentasjonNn from "../../locales/nn/dokumentasjon.ts";
import skjemaNn from "../../locales/nn/skjema.ts";
import dokumentasjonNb from "../../locales/nb/dokumentasjon.ts";
import skjemaNb from "../../locales/nb/skjema.ts";

export const resources = {
    en: {dokumentasjon: dokumentasjonEn, skjema: skjemaEn},
    nn: {dokumentasjon: dokumentasjonNn, skjema: skjemaNn},
    nb: {dokumentasjon: dokumentasjonNb, skjema: skjemaNb},
} as const;
