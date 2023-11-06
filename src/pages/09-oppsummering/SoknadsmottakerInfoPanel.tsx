import React, {useState} from "react";
import styled from "styled-components";
import {Brevkonvolutt} from "../../lib/components/svg/Brevkonvolutt";
import {LinkButton} from "../../lib/components/LinkButton";
import {BodyShort, GuidePanel, Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useHentAdresser} from "../../generated/adresse-ressurs/adresse-ressurs";
import {erAktiv} from "../../lib/navEnhetStatus";
import {NavEnhetInaktiv} from "../01-personalia/adresse/NavEnhet";
import {BehandlingAvPersonopplysningerModal} from "../hovedmeny/paneler/BehandlingAvPersonopplysningerModal";

const StyledGuidePanel = styled(GuidePanel)`
    /* TODO: Bytte ut --a-orange-200 med eks --a-surface-warning-subtle ? */
    --ac-guide-panel-border: var(--a-orange-200);
    --ac-guide-panel-illustration-bg: var(--a-orange-200);
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

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
                <StyledGuidePanel illustration={<Brevkonvolutt />} poster>
                    <Heading level="2" size="medium" spacing>
                        {t("soknadsosialhjelp.oppsummering.hvorsendes_del1", {valgtEnhetsNavn})}
                    </Heading>
                    <BodyShort spacing>
                        {t("soknadsosialhjelp.oppsummering.hvorsendes_del2", {valgtEnhetsNavn})}
                    </BodyShort>

                    <LinkButton type="button" onClick={() => setVisPersonopplysningerModal(true)}>
                        <BodyShort spacing>{t("informasjon.tekster.personopplysninger.rettigheter.lenke")}</BodyShort>
                    </LinkButton>
                </StyledGuidePanel>
            </>
        );
    });
};
