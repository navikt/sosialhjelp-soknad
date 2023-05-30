import {Button} from "@navikt/ds-react";
import * as React from "react";
import styled from "styled-components";
import {mobile} from "../../nav-soknad/styles/variables";
import {MargIkon, MargIkoner} from "./margIkoner";

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

export const EttersendelseAvsnitt = ({children}: {children: React.ReactNode}) => (
    <div className={"flex w-full bg-[var(--a-bg-default)] my-4"}>{children}</div>
);

export const EttersendelseTittel = ({children}: {children: React.ReactNode}) => (
    <div className={"flex flex-row"}>{children}</div>
);

/**
 * Vis et avsnitt med marger. Vis eventuelt ikoner i margene.
 * Hvis callback onClickHoyreIkon er satt, vis peker og hovereffekt på mouseover på ikonet.
 */
const AvsnittMedMargerEttersendelse: React.FC<Props> = ({
    children,
    venstreIkon,
    hoyreIkon,
    onClickHoyreIkon,
    className,
}) => {
    return (
        <div className={"flex w-full bg-[var(--a-bg-default)] my-4"}>
            <div className={"flex flex-row"}>
                <div className={"w-14"}>{venstreIkon && <MargIkon ikon={venstreIkon} />}</div>
                <Avsnitt className={className}>{children}</Avsnitt>
            </div>
            <Hoyremarg>
                {hoyreIkon && (
                    <>
                        {onClickHoyreIkon ? (
                            <Button variant="tertiary" onClick={() => onClickHoyreIkon()}>
                                <MargIkon ikon={hoyreIkon} />
                            </Button>
                        ) : (
                            <MargIkon ikon={hoyreIkon} />
                        )}
                    </>
                )}
            </Hoyremarg>
        </div>
    );
};

export default AvsnittMedMargerEttersendelse;
