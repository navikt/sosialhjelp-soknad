import React, {useState} from "react";
import {LinkButton} from "../../lib/components/LinkButton";
import {BodyShort, GuidePanel, Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useHentAdresser} from "../../generated/adresse-ressurs/adresse-ressurs";
import {erAktiv} from "../../lib/navEnhetStatus";
import {NavEnhetInaktiv} from "../01-personalia/adresse/NavEnhet";
import {BehandlingAvPersonopplysningerModal} from "../hovedmeny/paneler/BehandlingAvPersonopplysningerModal";

export const SoknadsmottakerInfoPanel = () => {
    const {expectOK} = useAlgebraic(useHentAdresser(useBehandlingsId()));
    const {t} = useTranslation("skjema");
    const [visPersonopplysningerModal, setVisPersonopplysningerModal] = useState<boolean>(false);

    return expectOK(({navEnhet}) => {
        if (!navEnhet) return null;
        if (!erAktiv(navEnhet)) return <NavEnhetInaktiv />;

        const {enhetsnavn, kommunenavn} = navEnhet;
        const valgtEnhetsNavn = `${enhetsnavn}, ${kommunenavn} ${t("generelt.kommune")}`;

        return (
            <>
                <BehandlingAvPersonopplysningerModal
                    open={visPersonopplysningerModal}
                    onClose={() => setVisPersonopplysningerModal(false)}
                />
                <GuidePanel poster className={"mt-6 mb-6"}>
                    <Heading level="2" size="medium" spacing>
                        {t("soknadsosialhjelp.oppsummering.hvorsendes_del1", {valgtEnhetsNavn})}
                    </Heading>
                    <BodyShort spacing>
                        {t("soknadsosialhjelp.oppsummering.hvorsendes_del2", {valgtEnhetsNavn})}
                    </BodyShort>

                    <LinkButton type="button" onClick={() => setVisPersonopplysningerModal(true)}>
                        <BodyShort spacing>{t("informasjon.tekster.personopplysninger.rettigheter.lenke")}</BodyShort>
                    </LinkButton>
                </GuidePanel>
            </>
        );
    });
};
