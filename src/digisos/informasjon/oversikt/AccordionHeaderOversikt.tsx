import React from "react";
import styled from "styled-components";
import AccordionHeader from "@navikt/ds-react/esm/accordion/AccordionHeader";
import {digisosColors} from "../../../nav-soknad/styles/variables";

const AccordionHeaderStyled = styled(AccordionHeader)`
    > div.ikon {
        height: 3.5rem;
        width: 3.5rem;
        margin: 0 0.5rem;
        flex-shrink: 0;
        background-color: ${digisosColors.digisosLysGronn};
        border: 0.5rem solid ${digisosColors.digisosLysGronn};
        border-radius: 50%;

        > svg {
            width: 100%;
            height: 100%;
        }

        @media screen and (max-width: 768px) {
            display: none;
        }
    }
    > div.tekst {
        flex-grow: 1;
    }
`;

interface AccordionHeaderOversiktProps {
    ikon?: React.ReactNode;
    children: React.ReactNode;
}

// Spesialtilpasset AccordionHeader-wrapper for Søknadsoversikt, med prop for å inkludere et ikon
export const AccordionHeaderOversikt = ({ikon, children}: AccordionHeaderOversiktProps) => (
    <AccordionHeaderStyled>
        <div className="ikon">{ikon}</div>
        <div className="tekst">{children}</div>
    </AccordionHeaderStyled>
);
