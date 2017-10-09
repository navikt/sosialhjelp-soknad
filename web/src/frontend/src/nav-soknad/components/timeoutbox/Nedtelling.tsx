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
				Dersom du ikke foretar deg noe, vil du bli logget ut.
				<br/>
				For å forsette, vennligst trykk fortsett.
			</Normaltekst>
			<div className="timeoutbox__knapperad">
				<Hovedknapp onClick={props.onContinueClick}>
					Fortsett
				</Hovedknapp>
				&nbsp; &nbsp; &nbsp; <a href="/pamcv/goto/logout" className="lenke knapp-lenke">Logg ut</a>
			</div>
		</div>
	);
};

export default Nedtelling;
