import * as React from "react";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import { Hovedknapp } from "nav-frontend-knapper";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";

interface OwnProps {
	onContinueClick: () => void;
	remainingTime: number;
}

type Props = OwnProps & InjectedIntlProps;

const Nedtelling: React.StatelessComponent<Props> = ({onContinueClick, remainingTime, intl}) => {
	const utlopsTidspunkt = remainingTime;
	const utlopsTidspunktFormattert = intl.formatTime(utlopsTidspunkt, {format: "mmss"});
	return (
		<div>
			<Innholdstittel className="blokk-s">
				<FormattedMessage id={"timeout.overskrift"}/>
			</Innholdstittel>
			<Normaltekst className="blokk-xxs">
				<FormattedMessage
					id={"timeout.nedtelling"}
					values={{utlopsTidspunkt: utlopsTidspunktFormattert}}
				/>
			</Normaltekst>
			<Hovedknapp onClick={onContinueClick}>
				<FormattedMessage id={"timeout.fortsett"}/>
			</Hovedknapp>
			&nbsp;
			<a href="/pamcv/goto/logout" className="lenke knapp-lenke">
				<FormattedMessage id={"timeout.loggut"}/>
			</a>
		</div>
	);
};

export default injectIntl(Nedtelling);
