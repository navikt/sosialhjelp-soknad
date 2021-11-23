import {Button} from "@navikt/ds-react";
import * as React from "react";
import styled from "styled-components";
import {mobile} from "../../../nav-soknad/styles/variables";
import {MargIkon, MargIkoner} from "./margIkoner";

const StyledAvsnittMedMarger = styled.div`
    display: flex;
    width: 100%;
    background-color: var(--navds-color-white);
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

const Venstremarg = styled.div`
    flex-direction: row;
    width: 55px;
    min-width: 35px;

    text-align: left;
    padding-left: 1rem;
    padding-right: 1rem;

    @media ${mobile} {
        padding-left: 4px;
    }

    svg {
        height: 26px;
        width: 26px;
    }
`;

const Hoyremarg = styled.div`
    flex-direction: row;
    width: 40px;
    display: block;
    padding-right: 1rem;

    @media ${mobile} {
        padding-right: 4px;
    }
`;

const Avsnitt = styled.div`
    flex-direction: row;
    width: 100%;
    text-align: left;

    @media ${mobile} {
        margin-bottom: 4px;
    }
`;

interface Props {
    children: React.ReactNode;
    venstreIkon?: MargIkoner;
    hoyreIkon?: MargIkoner;
    onClickHoyreIkon?: () => void;
    onClick?: () => void;
    className?: string;
}

function ikonButtonAriaLabel(ikon: string) {
    switch (ikon) {
        case MargIkoner.ADVARSEL:
            return "Advarsel";
        case MargIkoner.OK:
            return "Ok";
        case MargIkoner.PRINTER:
            return "Skriv ut";
        default:
            return "";
    }
}

/**
 * Vis et avsnitt med marger. Vis eventuelt ikoner i margene.
 * Hvis callback onClickHoyreIkon er satt, vis peker og hovereffekt på mouseover på ikonet.
 */
const AvsnittMedMarger: React.FC<Props> = ({children, venstreIkon, hoyreIkon, onClickHoyreIkon, className}) => {
    return (
        <StyledAvsnittMedMarger>
            <Venstremarg>{venstreIkon && <MargIkon ikon={venstreIkon} />}</Venstremarg>
            <Avsnitt className={className}>{children}</Avsnitt>

            <Hoyremarg>
                {hoyreIkon && (
                    <>
                        {onClickHoyreIkon ? (
                            <Button
                                variant="tertiary"
                                onClick={() => onClickHoyreIkon()}
                                aria-label={ikonButtonAriaLabel(hoyreIkon)}
                            >
                                <MargIkon ikon={hoyreIkon} />
                            </Button>
                        ) : (
                            <MargIkon ikon={hoyreIkon} />
                        )}
                    </>
                )}
            </Hoyremarg>
        </StyledAvsnittMedMarger>
    );
};

export default AvsnittMedMarger;
