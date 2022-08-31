import * as React from "react";
import UtropstegnSirkelGraIkon from "./UtropstegnSirkelGraIkon";
import Banner from "../banner/Banner";
import {useTitle} from "../../hooks/useTitle";
import {BodyShort, Button, Heading, Link} from "@navikt/ds-react";
import styled from "styled-components";

const StyledFeilside = styled.div`
    text-align: center;
`;

const Ikon = styled.div`
    margin-top: 40px;
`;

const LinkList = styled.ul`
    margin-top: 20px;
    padding-left: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2.5rem;

    li {
        display: inline-block;
    }
`;

export interface FeilsideProps {
    tittel?: string;
    children: React.ReactNode;
    visKnapp?: boolean;
    knappTekst?: string;
    onClick?: (event: React.MouseEvent<any>) => void;
}

/**
 * Default inneholder denne hardkodete tekster i og
 * med det er ikke sikkert tekstressurser er tilgjengelig
 */
const Feilside: React.FC<FeilsideProps> = ({
    tittel = "OOPS, NOE GIKK GALT",
    children,
    visKnapp,
    knappTekst = "Gå tilbake",
    onClick,
}) => {
    useTitle(`Feilside - ${document.location.hostname}`);
    return (
        <>
            <Banner>Søknad om økonomisk sosialhjelp</Banner>
            <StyledFeilside>
                <Ikon>
                    <UtropstegnSirkelGraIkon />
                </Ikon>
                <Heading level="1" size="large" spacing>
                    {tittel}
                </Heading>
                <BodyShort spacing>{children}</BodyShort>
                {visKnapp ? (
                    <Button variant="primary" onClick={onClick}>
                        {knappTekst}
                    </Button>
                ) : null}
                <LinkList>
                    <li>
                        <BodyShort>
                            <Link href="https://www.nav.no">Gå til forsiden nav.no</Link>
                        </BodyShort>
                    </li>
                    <li>
                        <BodyShort>
                            <Link href="https://www.nav.no/minside">Gå til Min side</Link>
                        </BodyShort>
                    </li>
                    <li>
                        <BodyShort>
                            <Link href="https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler">
                                Meld fra om feil
                            </Link>
                        </BodyShort>
                    </li>
                </LinkList>
            </StyledFeilside>
        </>
    );
};

export default Feilside;
