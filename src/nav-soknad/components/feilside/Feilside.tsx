import * as React from "react";
import UtropstegnSirkelGraIkon from "./UtropstegnSirkelGraIkon";
import Banner from "../banner/Banner";
import {useTitle} from "../../hooks/useTitle";
import {BodyShort, Button, Heading, Link} from "@navikt/ds-react";

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
            <div className={"text-center space-y-4 py-10"}>
                <div className={"flex justify-center"}>
                    <UtropstegnSirkelGraIkon />
                </div>
                <Heading level="1" size="large" spacing>
                    {tittel}
                </Heading>
                <BodyShort spacing>{children}</BodyShort>
                {visKnapp ? (
                    <Button variant="primary" onClick={onClick}>
                        {knappTekst}
                    </Button>
                ) : null}

                <BodyShort>
                    <Link href="https://www.nav.no">Gå til nav.no</Link>
                </BodyShort>

                <BodyShort>
                    <Link href="https://www.nav.no/minside">Gå til Min side</Link>
                </BodyShort>

                <BodyShort>
                    <Link href="https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler">
                        Meld fra om feil
                    </Link>
                </BodyShort>
            </div>
        </>
    );
};

export default Feilside;
