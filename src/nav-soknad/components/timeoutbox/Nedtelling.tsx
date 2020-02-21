import * as React from "react";
import { FormattedMessage } from "react-intl";

import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import { Hovedknapp } from "nav-frontend-knapper";

interface OwnProps {
	onContinueClick: () => void;
	utloggingsUrl: string;
}

type Props = OwnProps;

const Nedtelling: React.StatelessComponent<Props> = ({
	onContinueClick,
	utloggingsUrl
}) => {
	return (
		<div>
			<Innholdstittel className="blokk-s timeoutbox__overskrift">
				<FormattedMessage id={"timeout.overskrift"} />
			</Innholdstittel>
			<Normaltekst className="blokk-xxs">
				<FormattedMessage id={"timeout.nedtelling"} />
			</Normaltekst>
			<div className="timeoutbox__knapperad">
				<Hovedknapp onClick={onContinueClick} type="hoved">
					<FormattedMessage id={"timeout.fortsett"} />
				</Hovedknapp>
				<a
					href={utloggingsUrl}
					className="lenke knapp-lenke timeoutbox__loggutknapp linje_under"
				>
					<FormattedMessage id={"timeout.loggut"} />
				</a>
			</div>
		</div>
	);
};

export default Nedtelling;
