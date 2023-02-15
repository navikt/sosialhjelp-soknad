import React from "react";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import Brevkonvolutt from "../../../nav-soknad/components/svg/Brevkonvolutt";
import {visSamtykkeInfo} from "../../redux/soknad/soknadActions";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";
import {BodyShort, GuidePanel, Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../nav-soknad/hooks/useBehandlingsId";
import {useGetValgtNavEnhet} from "../../../generated/nav-enhet-ressurs/nav-enhet-ressurs";
import {useAlgebraic} from "../../../lib/hooks/useAlgebraic";

const StyledGuidePanel = styled(GuidePanel)`
    /* TODO: Bytte ut --a-orange-200 med eks --a-surface-warning-subtle ? */
    --ac-guide-panel-border: var(--a-orange-200);
    --ac-guide-panel-illustration-bg: var(--a-orange-200);
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

export const SoknadsmottakerInfoPanel = () => {
    const {expectOK} = useAlgebraic(useGetValgtNavEnhet(useBehandlingsId()));
    const dispatch = useDispatch();
    const {t} = useTranslation("skjema");

    return expectOK(({enhetsnavn, kommunenavn}) => {
        const valgtEnhetsNavn = `${enhetsnavn}, ${kommunenavn} kommune`;
        return (
            <StyledGuidePanel illustration={<Brevkonvolutt />} poster>
                <Heading level="2" size="medium" spacing>
                    Søknaden din blir sendt til {valgtEnhetsNavn}
                </Heading>
                <BodyShort spacing>
                    Dette kontoret har ansvar for å behandle søknaden din, og {valgtEnhetsNavn} lagrer opplysningene fra
                    søknaden.
                </BodyShort>

                <LinkButton
                    type="button"
                    onClick={() => {
                        dispatch(visSamtykkeInfo(true));
                    }}
                >
                    <BodyShort spacing>{t("informasjon.tekster.personopplysninger.rettigheter.lenke")}</BodyShort>
                </LinkButton>
            </StyledGuidePanel>
        );
    });
};
