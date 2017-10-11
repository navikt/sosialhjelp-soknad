import * as React from "react";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import "./timeoutbox.css";
import { FormattedMessage } from "react-intl";
import { Hovedknapp } from "nav-frontend-knapper";

interface Props {
	onLoginAgainClick: () => void;
}

const LoggetUt: React.StatelessComponent<Props> = props => {
	return (
		<div>
			<Innholdstittel className="blokk-s">
				<FormattedMessage id={"timeout.overskrift"}/>
			</Innholdstittel>
			<Normaltekst className="blokk-xxs">
				<FormattedMessage id={"timeout.utlopt"} />
			</Normaltekst>
			<div className="timeoutbox__knapperad">
				<Hovedknapp onClick={props.onLoginAgainClick}>
					<FormattedMessage id={"timeout.logginn"}/>
				</Hovedknapp>
			</div>
		</div>
	);
};

export default LoggetUt;
