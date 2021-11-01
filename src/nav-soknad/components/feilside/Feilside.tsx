import * as React from "react";
import {Innholdstittel} from "nav-frontend-typografi";
import UtropstegnSirkelGraIkon from "./UtropstegnSirkelGraIkon";
import Banner from "../banner/Banner";
import Lenke from "nav-frontend-lenker";
import {useTitle} from "../../hooks/useTitle";
import {Button} from "@navikt/ds-react";

export interface FeilsideProps {
    tittel?: string;
    children: React.ReactNode;
    feilkode?: string;
    visKnapp?: boolean;
    knappTekst?: string;
    onClick?: (event: React.MouseEvent<any>) => void;
}

/**
 * Default inneholder denne hardkodete tekster i og
 * med det er ikke sikkert tekstressurser er tilgjengelig
 */
const FeilSide: React.FC<FeilsideProps> = ({
    tittel = "OOPS, NOE GIKK GALT",
    children,
    feilkode,
    visKnapp,
    knappTekst = "Gå tilbake",
    onClick,
}) => {
    useTitle(`Feilside - ${document.location.hostname}`);
    return (
        <span>
            <Banner>Søknad om økonomisk sosialhjelp</Banner>
            <div className="feilside skjema-content">
                <div className="feilside__ikon">
                    <UtropstegnSirkelGraIkon />
                </div>
                <Innholdstittel className="feilside__tittel">{tittel}</Innholdstittel>
                <div className="feilside__innhold">{children}</div>
                {feilkode ? <div className="feilside__feilkode">Feilkode {feilkode}</div> : null}
                {visKnapp ? (
                    <Button variant="primary" onClick={onClick}>
                        {knappTekst}
                    </Button>
                ) : null}
                <ul className="feilside__link-liste">
                    <li className="feilside__link">
                        <Lenke href="https://www.nav.no">Gå til forsiden nav.no</Lenke>
                    </li>
                    <li className="feilside__link">
                        <Lenke href="https://www.nav.no/no/Ditt+NAV">Gå til Ditt NAV</Lenke>
                    </li>
                    <li className="feilside__link">
                        <Lenke href="https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Klage+ris+og+ros/Feil+og+mangler+paa+navno">
                            Meld fra om feil
                        </Lenke>
                    </li>
                </ul>
            </div>
        </span>
    );
};

export default FeilSide;
