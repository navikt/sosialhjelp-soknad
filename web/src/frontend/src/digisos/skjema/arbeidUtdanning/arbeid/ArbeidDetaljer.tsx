import * as React from "react";
import { FormattedMessage } from "react-intl";
import Detaljeliste, { DetaljelisteElement } from "../../../../nav-soknad/components/detaljeliste";
import { Arbeidsforhold } from "./arbeidTypes";

const ArbeidDetaljer: React.FunctionComponent<{ arbeidsforhold: Arbeidsforhold }> = ({ arbeidsforhold }) => {
	const { arbeidsgivernavn, stillingsprosent, stillingstypeErHeltid, fom, tom } = arbeidsforhold;
	let stillingsprosentVisning = stillingsprosent + "%";
	if (stillingsprosent === 0 && stillingstypeErHeltid === false) {
		stillingsprosentVisning = "Variabel";
	}

	return (
		<Detaljeliste>
			<DetaljelisteElement
				tittel={<FormattedMessage id="arbeidsforhold.arbeidsgivernavn.label"/>}
				verdi={arbeidsgivernavn}
			/>
			<DetaljelisteElement
				tittel={<FormattedMessage id="arbeidsforhold.fom.label"/>}
				verdi={fom}
			/>
			{tom !== "" && (
				<DetaljelisteElement
					tittel={<FormattedMessage id="arbeidsforhold.tom.label"/>}
					verdi={tom}
				/>
			)}
			<DetaljelisteElement
				tittel={<FormattedMessage id="arbeidsforhold.stillingsprosent.label"/>}
				verdi={stillingsprosentVisning}
			/>
		</Detaljeliste>
	);
};

export default ArbeidDetaljer;
