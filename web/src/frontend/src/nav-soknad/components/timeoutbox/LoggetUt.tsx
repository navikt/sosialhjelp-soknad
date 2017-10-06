import * as React from "react";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import { Hovedknapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";

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
			<Hovedknapp onClick={props.onLoginAgainClick}>
				<FormattedMessage id={"timeout.logginn"} />
			</Hovedknapp>
		</div>
	);
};

export default LoggetUt;
