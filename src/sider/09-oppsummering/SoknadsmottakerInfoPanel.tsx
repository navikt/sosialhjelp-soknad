import React from "react";
import {BodyShort, GuidePanel, Heading, Link} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useHentAdresser} from "../../generated/adresse-ressurs/adresse-ressurs";
import {erAktiv} from "../../lib/navEnhetStatus";
import {NavEnhetInaktiv} from "../01-personalia/adresse/NavEnhetInaktiv";

const URL = "https://www.nav.no/personopplysninger-sosialhjelp";

export const SoknadsmottakerInfoPanel = () => {
    const {expectOK} = useAlgebraic(useHentAdresser(useBehandlingsId()));
    const {t, i18n} = useTranslation("skjema");

    return expectOK(({navEnhet}) => {
        if (!navEnhet) return null;
        if (!erAktiv(navEnhet)) return <NavEnhetInaktiv />;

        const {enhetsnavn, kommunenavn} = navEnhet;
        const valgtEnhetsNavn = `${enhetsnavn}, ${kommunenavn} ${t("generelt.kommune")}`;

        return (
            <>
                <GuidePanel poster className={"mt-6 mb-6"}>
                    <Heading level="2" size="medium" spacing>
                        {t("soknadsosialhjelp.oppsummering.hvorsendes_del1", {valgtEnhetsNavn})}
                    </Heading>
                    <BodyShort spacing>
                        {t("soknadsosialhjelp.oppsummering.hvorsendes_del2", {valgtEnhetsNavn})}
                    </BodyShort>

                    <Link
                        type="button"
                        href={i18n.language === "nb" ? URL : `URL/${i18n.language}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <BodyShort spacing>{t("informasjon.tekster.personopplysninger.rettigheter.lenke")}</BodyShort>
                    </Link>
                </GuidePanel>
            </>
        );
    });
};
