import * as React from "react";
import { FormattedMessage } from "react-intl";
import Banner from "../banner/Banner";

const AppHeader: React.FC = () => {
	let skjemaTitel = "skjema.tittel";
	console.dir(window.location);
	if(window.location.pathname.indexOf("/selvstendignaringsdrivende") >= 0) {
		skjemaTitel += ".selvstendignaringsdrivende";
	}
	return (
		<Banner>
			<FormattedMessage id={skjemaTitel} />
		</Banner>
	);
};

export default AppHeader;