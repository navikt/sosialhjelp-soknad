import * as React from "react";
import {FormattedMessage} from "react-intl";
import Detaljeliste, { DetaljelisteElement } from "../../../../nav-soknad/components/detaljeliste";
import { Arbeidsforhold } from "./arbeidTypes";
import Dato from "../../../../nav-soknad/components/tidspunkt/Dato";

const ArbeidDetaljer: React.FunctionComponent<{ arbeidsforhold: Arbeidsforhold }> = ({ arbeidsforhold }) => {
	const { arbeidsgivernavn, stillingsprosent, fom, tom } = arbeidsforhold;
	let stillingsprosentVisning = stillingsprosent + "%";

	return (
		<Detaljeliste>
			<DetaljelisteElement
				tittel={<FormattedMessage id="arbeidsforhold.arbeidsgivernavn.label"/>}
				verdi={arbeidsgivernavn}
			/>
			<DetaljelisteElement
				tittel={<FormattedMessage id="arbeidsforhold.fom.label"/>}
				verdi={<span>&nbsp;<Dato tidspunkt={fom}/></span>}
			/>
			{(tom !== "" && tom !== null) && (
				<DetaljelisteElement
					tittel={<FormattedMessage id="arbeidsforhold.tom.label"/>}
					verdi={<span>&nbsp;<Dato tidspunkt={tom}/></span>}
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
