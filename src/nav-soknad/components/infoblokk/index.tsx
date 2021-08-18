import * as React from "react";
import Panel from "nav-frontend-paneler";
import {Innholdstittel} from "nav-frontend-typografi";
import {Information} from "@navikt/ds-icons";
import styled from "styled-components";

const PanelTitle = styled.div`
    text-align: center;
`;

const StyledIcon = styled.div`
    margin-top: 1rem;

    svg {
        height: 2.5rem;
        width: 2.5rem;
        margin-bottom: 1.5rem;
    }
`;

const Dash = styled.div`
    width: 2.7rem;
    margin: 0 auto 1.5rem auto;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #6a6a6a;
`;
interface Props {
    tittel: string;
    className?: string;
}

const Infoblokk: React.FC<Props> = ({className, children, tittel}) => {
    return (
        <Panel className={`${className}`}>
            <PanelTitle>
                <StyledIcon>
                    <Information />
                    <Innholdstittel>{tittel}</Innholdstittel>
                    <Dash />
                </StyledIcon>
            </PanelTitle>
            <div>{children}</div>
        </Panel>
    );
};

export default Infoblokk;
