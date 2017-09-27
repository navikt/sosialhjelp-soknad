import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Sidetittel } from "nav-frontend-typografi";

const AppTittel: React.StatelessComponent<{}> = ({}) => {
	return (
		<div className="app-digisos__title">
			<Sidetittel>
				<FormattedMessage id="skjema.tittel" />
			</Sidetittel>
		</div>
	);
};

export default AppTittel;
