import * as React from "react";
import Feilside from "./Feilside";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { Undertittel } from "nav-frontend-typografi";
import { getIntlTextOrKey } from "../../utils/intlUtils";

const ServerFeil: React.StatelessComponent<InjectedIntlProps> = ({ intl }) => {
	return (
		<Feilside
			visKnapp={true}
			onClick={() => {
				// TODO: dispatch navigation
			}}
			knappTekst={ intl.formatMessage({id: "feilside.serverfeil.knapp"})}
		>
			<div>
				{ intl.formatMessage({ id: "feilside.serverfeil.feilmelding" })}
				<Undertittel key="feilside.serverfeil.nodsituasjon.tittel">
					{getIntlTextOrKey(intl, "feilside.serverfeil.nodsituasjon.tittel")}
				</Undertittel>
				<p className="blokk-s">
					<FormattedMessage id="feilside.serverfeil.nodsituasjon.tekst"/>
				</p>
			</div>
		</Feilside>
	);
};

export default injectIntl(ServerFeil);
