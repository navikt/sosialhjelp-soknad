import React, {useState} from "react";
import styled from "styled-components";
import Brevkonvolutt from "../../nav-soknad/components/svg/Brevkonvolutt";
import {LinkButton} from "../../nav-soknad/components/linkButton/LinkButton";
import {BodyShort, GuidePanel, Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {useAlgebraic} from "../../lib/hooks/useAlgebraic";
import BehandlingAvPersonopplysningerModal from "../../hovedmeny/paneler/BehandlingAvPersonopplysningerModal";
import {useHentAdresser} from "../../generated/adresse-ressurs/adresse-ressurs";
import {erAktiv} from "../../nav-soknad/containers/navEnhetStatus";
import {NavEnhetInaktiv} from "../01-personalia/adresse/NavEnhet";

const StyledGuidePanel = styled(GuidePanel)`
    /* TODO: Bytte ut --a-orange-200 med eks --a-surface-warning-subtle ? */
    --ac-guide-panel-border: var(--a-orange-200);
    --ac-guide-panel-illustration-bg: var(--a-orange-200);
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

// FIXME: Translation
export const SoknadsmottakerInfoPanel = () => {
    const {expectOK} = useAlgebraic(useHentAdresser(useBehandlingsId()));
    const {t} = useTranslation("skjema");
    const [visPersonopplysningerModal, setVisPersonopplysningerModal] = useState<boolean>(false);

    return expectOK(({navEnhet}) => {
        if (!navEnhet) return null;
        if (!erAktiv(navEnhet)) return <NavEnhetInaktiv />;

        const {enhetsnavn, kommunenavn} = navEnhet;
        const valgtEnhetsNavn = `${enhetsnavn}, ${kommunenavn} kommune`;

        return (
            <>
                <BehandlingAvPersonopplysningerModal
                    open={visPersonopplysningerModal}
                    onClose={() => setVisPersonopplysningerModal(false)}
                />
                <StyledGuidePanel illustration={<Brevkonvolutt />} poster>
                    <Heading level="2" size="medium" spacing>
                        Søknaden din blir sendt til {valgtEnhetsNavn}
                    </Heading>
                    <BodyShort spacing>
                        Dette kontoret har ansvar for å behandle søknaden din, og {valgtEnhetsNavn} lagrer opplysningene
                        fra søknaden.
                    </BodyShort>

                    <LinkButton type="button" onClick={() => setVisPersonopplysningerModal(true)}>
                        <BodyShort spacing>{t("informasjon.tekster.personalia.rettigheter.lenke")}</BodyShort>
                    </LinkButton>
                </StyledGuidePanel>
            </>
        );
    });
};
