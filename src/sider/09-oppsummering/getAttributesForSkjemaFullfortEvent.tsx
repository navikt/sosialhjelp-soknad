import {Oppsummering} from "../../generated/model";

export const getAttributesForSkjemaFullfortEvent = (oppsummering: Oppsummering | undefined) => {
    const attr: Record<string, any> = {};
    if (!oppsummering) return attr;

    oppsummering.steg.forEach((steg) =>
        steg.avsnitt.forEach((avsnitt) =>
            avsnitt.sporsmal.forEach(({tittel, felt}) => {
                if (tittel === "bosituasjon.sporsmal") attr["valgtBosted"] = !!felt?.length;
                if (tittel === "arbeidsforhold.infotekst") attr["harArbeidsforhold"] = !!felt?.length;
                if (tittel === "utbetalinger.inntekt.skattbar.har_gitt_samtykke") attr["skattSamtykke"] = true;
                if (tittel === "utbetalinger.inntekt.skattbar.mangler_samtykke") attr["skattSamtykke"] = false;
            })
        )
    );

    attr.language = localStorage.getItem("digisos-language");

    return attr;
};
