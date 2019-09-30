import * as React from "react";
import { Knapp } from "nav-frontend-knapper";
import { Innholdstittel } from "nav-frontend-typografi";
import DocumentTitle from "react-document-title";
import UtropstegnSirkelGraIkon from "./UtropstegnSirkelGraIkon";
import AppHeader from "../appHeader/AppHeader";
import Banner from "../banner/Banner";

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
	onClick
}) => {
	return (
		<span>
			<Banner>
				Søknad om økonomisk sosialhjelp
			</Banner>
			<div className="feilside skjema-content">

				<DocumentTitle title={"Feilside - " + document.location.hostname} />
				<div className="feilside__ikon">
					<UtropstegnSirkelGraIkon />
				</div>
				<Innholdstittel className="feilside__tittel">{tittel}</Innholdstittel>
				<div className="feilside__innhold">{children}</div>
				{feilkode ? (
					<div className="feilside__feilkode">Feilkode {feilkode}</div>
				) : null}
				{visKnapp ? (
					<Knapp htmlType="button" onClick={onClick}>
						{knappTekst}
					</Knapp>
				) : null}
				<ul className="feilside__link-liste">
					<li className="feilside__link">
						<a href="http://www.nav.no" className="lenke">
							Gå til forsiden nav.no
						</a>
					</li>
					<li className="feilside__link">
						<a href="https://www.nav.no/no/Ditt+NAV" className="lenke">
							Gå til Ditt NAV
						</a>
					</li>
					<li className="feilside__link">
						<a
							href="https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Klage+ris+og+ros/Feil+og+mangler+paa+navno"
							className="lenke"
						>
							Meld fra om feil
						</a>
					</li>
				</ul>
			</div>
		</span>
	);
};

export default FeilSide;
