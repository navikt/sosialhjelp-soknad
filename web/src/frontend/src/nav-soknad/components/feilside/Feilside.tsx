import * as React from "react";
import { Knapp } from "nav-frontend-knapper";
import { Innholdstittel } from "nav-frontend-typografi";

const DocumentTitle = require("react-document-title");

const gaTilbake = () => {
	if (history.length === 1) {
		window.location.href = "https://www.nav.no";
	} else {
		history.back();
	}
};

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
const FeilSide: React.StatelessComponent<FeilsideProps> = ({
	tittel = "OOPS, NOE GIKK GALT",
	children,
	feilkode,
	visKnapp,
	knappTekst = "Gå tilbake",
	onClick = gaTilbake
}) => {
	return (
		<div className="skjema-feilside">
			<DocumentTitle title={"Feilside - " + document.location.hostname} />
			<Innholdstittel className="skjema-feilside__tittel">
				{tittel}
			</Innholdstittel>
			{children}
			{feilkode ? (
				<div className="skjema-feilside__feilkode">Feilkode {feilkode}</div>
			) : null}
			{visKnapp ? (
				<Knapp type="standard" htmlType="button" onClick={onClick}>
					{knappTekst}
				</Knapp>
			) : null}
		</div>
	);
};

export default FeilSide;
