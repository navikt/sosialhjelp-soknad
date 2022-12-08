import React from "react";
import styled from "styled-components";
import Ella from "../../../nav-soknad/components/svg/Ella";
import {BodyShort, GuidePanel, Heading} from "@navikt/ds-react";

const StyledGuidePanel = styled(GuidePanel)`
    /* TODO: Bytte ut --a-orange-200 med eks --a-surface-warning-subtle ? */
    --ac-guide-panel-border: var(--a-orange-200);
    --ac-guide-panel-illustration-bg: var(--a-orange-200);
    margin-bottom: 2rem;
`;

export const UbesvarteSporsmalPanel = () => {
    return (
        <StyledGuidePanel illustration={<Ella visBakgrundsSirkel={false} />} poster>
            <Heading level="2" size="medium" spacing>
                Du har ikke besvart alle spørsmålene i søknaden
            </Heading>
            <BodyShort spacing>
                For å gjøre det enklere for veilederen å behandle søknaden din anbefaler jeg at du svarer på alle
                spørsmålene.
            </BodyShort>
        </StyledGuidePanel>
    );
};
