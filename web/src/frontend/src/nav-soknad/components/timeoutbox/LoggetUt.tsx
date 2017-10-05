import * as React from "react";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import { Hovedknapp } from "nav-frontend-knapper";

interface Props {
	onLoginAgainClick: () => void;
}

const LoggetUt: React.StatelessComponent<Props> = props => {
	return (
		<div>
			<Innholdstittel className="blokk-s">
				Obs!
			</Innholdstittel>
			<Normaltekst className="blokk-xxs">
				Sesjonen har utløpt. Du må nå logge inn igjen for å fortsette.
			</Normaltekst>
			<Hovedknapp onClick={() => props.onLoginAgainClick}>
				Logg inn på nytt
			</Hovedknapp>

		</div>
	);
};

export default LoggetUt;
