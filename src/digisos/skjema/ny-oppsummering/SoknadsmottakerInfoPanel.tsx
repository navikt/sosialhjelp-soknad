import React from "react";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import Brevkonvolutt from "../../../nav-soknad/components/svg/Brevkonvolutt";
import {FormattedMessage} from "react-intl";
import {visSamtykkeInfo} from "../../redux/soknad/soknadActions";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";
import {BodyShort, GuidePanel, Heading} from "@navikt/ds-react";
import {NavEnhet} from "../personopplysninger/adresse/AdresseTypes";

const StyledGuidePanel = styled(GuidePanel)`
    --navds-guide-panel-color-border: var(--navds-color-orange-20);
    --navds-guide-panel-color-illustration-background: var(--navds-color-orange-20);
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

export const SoknadsmottakerInfoPanel = (props: {valgtSoknadsmottaker: NavEnhet}) => {
    const dispatch = useDispatch();

    const valgtEnhetsNavn = `${props.valgtSoknadsmottaker.enhetsnavn}, ${props.valgtSoknadsmottaker.kommunenavn} kommune`;
    return (
        <StyledGuidePanel illustration={<Brevkonvolutt visBakgrundsSirkel={false} />} poster>
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
                <BodyShort spacing>
                    <FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.lenke" />
                </BodyShort>
            </LinkButton>
        </StyledGuidePanel>
    );
};
