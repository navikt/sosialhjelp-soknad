import * as React from "react";
import SporsmalTittel from "./SporsmalTittel";
import SporsmalBeskrivelse from "./SporsmalBeskrivelse";
import Spacing from "./Spacing";
import { FormattedMessage } from "react-intl";

const SporsmalBlokk: React.StatelessComponent<{i18nKey: string, children: React.ReactNode}> = ({ i18nKey, children }) => {
	return (
		<span className="skjema-sporsmal">
			<SporsmalTittel><FormattedMessage id={i18nKey + ".sporsmal"}/>{/* TODO hjelpetekst*/}</SporsmalTittel>
			<SporsmalBeskrivelse><FormattedMessage id={i18nKey + ".label"} /></SporsmalBeskrivelse>
				{children}
			<Spacing type="sporsmal"/>
		</span>
	);
};

export default SporsmalBlokk;
