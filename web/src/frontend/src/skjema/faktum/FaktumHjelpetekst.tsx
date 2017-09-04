import * as React from "react";
import { HjelpetekstAuto } from "nav-frontend-hjelpetekst";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getIntlInfoTekst } from "../utils";

interface Props {
	hjelpetekstId: string;
}

const FaktumHjelpetekst: React.StatelessComponent<
	Props & InjectedIntlProps
> = ({ intl, hjelpetekstId }) => {
	const infoTekst = getIntlInfoTekst(intl, hjelpetekstId);
	if (!infoTekst) {
		return null;
	}
	return (
		<HjelpetekstAuto tittel={infoTekst.tittel}>
			{infoTekst.tekst}
		</HjelpetekstAuto>
	);
};

export default injectIntl(FaktumHjelpetekst);
