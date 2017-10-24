import * as React from "react";
import Feilside from "./Feilside";
import { InjectedIntlProps, injectIntl } from "react-intl";

const IkkeFunnet: React.StatelessComponent<InjectedIntlProps> = ({ intl }) => {
	return (
		<Feilside
			visKnapp={true}
		>
			<p>{intl.formatMessage({ id: "feilside.ikkefunnet.feilmelding" })}</p>
		</Feilside>
	);
};

// Må legge til "as React.StatelessComponent" for at typescript ikke skal klage på at man ikke sender inn intl som props
export default injectIntl(IkkeFunnet as React.StatelessComponent);
