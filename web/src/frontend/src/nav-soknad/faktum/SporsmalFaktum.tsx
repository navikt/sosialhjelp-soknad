import * as React from "react";
import Sporsmal from "../components/sporsmal";
import { getFaktumSporsmalTekst } from "../utils";
import { injectIntl, InjectedIntlProps } from "react-intl";

interface Props extends React.Props<any> {
	faktumId: string;
}

const SporsmalFaktum: React.StatelessComponent<Props & InjectedIntlProps> = ({
	children,
	faktumId,
	intl
}) => {
	const tekster = getFaktumSporsmalTekst(intl, faktumId);
	return (
		<Sporsmal
			sporsmal={tekster.sporsmal}
			hjelpetekst={tekster.hjelpetekst}
			info={tekster.infotekst}
		>
			{children}
		</Sporsmal>
	);
};

export default injectIntl(SporsmalFaktum);
