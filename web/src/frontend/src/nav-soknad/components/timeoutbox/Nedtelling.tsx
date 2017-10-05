import * as React from "react";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import { Hovedknapp } from "nav-frontend-knapper";
import { FormattedTime } from "react-intl";

interface Props {
	onContinueClick: () => void;
	remainingTime: number;
}

const Nedtelling: React.StatelessComponent<Props> = props => {
	const utlopsTidspunkt = props.remainingTime;
	return (
		<div>
			<Innholdstittel className="blokk-s">
				Obs!
			</Innholdstittel>
			<Normaltekst className="blokk-xxs">
				Din sesjon vil utløpe om <FormattedTime value={utlopsTidspunkt} format="mmss" /> minutter.
				Dersom du ikke foretar deg noe, vil du bli logget ut. For å forsette, vennligst trykk fortsett.
			</Normaltekst>
			<Hovedknapp onClick={props.onContinueClick}>
				Fortsett
			</Hovedknapp>
			&nbsp; <a href="/pamcv/goto/logout" className="lenke knapp-lenke">Logg ut</a>
		</div>
	);
};

export default Nedtelling;
