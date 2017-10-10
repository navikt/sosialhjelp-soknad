import * as React from "react";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import { Hovedknapp } from "nav-frontend-knapper";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";

interface OwnProps {
	onContinueClick: () => void;
	utloggingsUrl: string;
}

type Props = OwnProps & InjectedIntlProps;

const Nedtelling: React.StatelessComponent<Props> = ({onContinueClick, utloggingsUrl, intl}) => {
	return (
		<div>
			<Innholdstittel className="blokk-s">
				<FormattedMessage id={"timeout.overskrift"}/>
			</Innholdstittel>
			<Normaltekst className="blokk-xxs">
				<FormattedMessage id={"timeout.nedtelling"}/>
			</Normaltekst>
			<div className="timeoutbox__knapperad">
				<Hovedknapp onClick={onContinueClick}>
					<FormattedMessage id={"timeout.fortsett"}/>
				</Hovedknapp>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<a href={utloggingsUrl} className="lenke knapp-lenke">
					<FormattedMessage id={"timeout.loggut"}/>
				</a>
			</div>
		</div>
	);
};

export default injectIntl(Nedtelling);
