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
	// const minutter = intl.formatMessage({id: "timeout.minutter"});
	// const sekunder = intl.formatMessage({id: "timeout.sekunder"});
	// const underEttMinuttIgjen = (utlopsTidspunkt / (1000 * 60)) < 0;
	console.log("utlopsTidspunkt: " + utlopsTidspunkt);
	let utlopsTidspunktFormattert = intl.formatTime(utlopsTidspunkt, {format: "mmss"});
	debugger;
	// let utlopsTidspunktMsg = utlopsTidspunktFormattert + " x " + underEttMinuttIgjen ? minutter : sekunder;
	console.log("utlopsTidspunktFormattert: " + utlopsTidspunktFormattert);
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
			<div className="timeoutbox__knapperad">
				<Hovedknapp onClick={onContinueClick}>
					<FormattedMessage id={"timeout.fortsett"}/>
				</Hovedknapp>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="/pamcv/goto/logout" className="lenke knapp-lenke">
					<FormattedMessage id={"timeout.loggut"}/>
				</a>
			</div>
		</div>
	);
};

export default injectIntl(Nedtelling);
