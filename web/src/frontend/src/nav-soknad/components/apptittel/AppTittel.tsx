import * as React from "react";
import { FormattedMessage } from "react-intl";

const AppTittel: React.StatelessComponent<{}> = ({}) => {
	return (
		<h1 className="app-digisos__title">
			<FormattedMessage id="skjema.tittel"/>
		</h1>
	);
};

export default AppTittel;
