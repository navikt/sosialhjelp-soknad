import React from "react";
import {BodyShort, GuidePanel, Heading, Link} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {erAktiv} from "../../lib/navEnhetStatus";
import {NavEnhetInaktiv} from "../01-personalia/adresse/NavEnhetInaktiv";
import {useGetAdresser} from "../../generated/new/adresse-controller/adresse-controller.ts";

const URL = "https://www.nav.no/personopplysninger-sosialhjelp";

export const SoknadsmottakerInfoPanel = () => {
    const {expectOK} = useAlgebraic(useGetAdresser(useSoknadId()));
    const {t, i18n} = useTranslation("skjema");

    return expectOK(({navenhet}) => {
        if (!navenhet) return null;
        if (!erAktiv(navenhet)) return <NavEnhetInaktiv />;

        const {enhetsnavn, kommunenavn} = navenhet;
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
