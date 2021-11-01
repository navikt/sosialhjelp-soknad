import * as React from "react";
import {HelpText} from "@navikt/ds-react";
import styled from "styled-components";

const StyledHelpText = styled.div`
    margin-left: 0.5rem;
    font-weight: 400;
    font-size: 1.125rem;
    display: inline-block;

    .navds-popover__content {
        max-width: 390px;
    }
`;

export const SporsmalHjelpetekst: React.FC<{tekster: any}> = ({tekster}) => {
    return (
        <StyledHelpText>
            <HelpText title={tekster.hjelpetekst.tittel}>{tekster.hjelpetekst.tekst}</HelpText>
        </StyledHelpText>
    );
};

export const SporsmalInfotekst: React.FC<{tekster: any}> = ({tekster}) => {
    return (
        <div className="skjema-sporsmal__infotekst">
            {tekster.infotekst.tittel && (
                <h4 className="skjema-sporsmal__infotekst__tittel">{tekster.infotekst.tittel}</h4>
            )}
            {tekster.infotekst.tekst}
        </div>
    );
};
