import * as React from "react";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import "./timeoutbox.css";

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
				Du har vært inaktiv på denne siden for lenge.
				<br/>
				Du må logge deg inn på nytt for å fortsette.
			</Normaltekst>
			<div className="timeoutbox__knapperad">
				<a href="">
					Logg inn på nytt
				</a>
			</div>

		</div>
	);
};

export default LoggetUt;
