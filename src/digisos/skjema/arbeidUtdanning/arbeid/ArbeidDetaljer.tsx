import * as React from "react";
import {FormattedDate, FormattedMessage} from "react-intl";
import Detaljeliste, { DetaljelisteElement } from "../../../../nav-soknad/components/detaljeliste";
import { Arbeidsforhold } from "./arbeidTypes";

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
				verdi={<span className="dato">
							&nbsp;<FormattedDate value={fom} day="numeric" month="long" year="numeric" />
						</span>}
			/>
			{tom !== "" && (
				<DetaljelisteElement
					tittel={<FormattedMessage id="arbeidsforhold.tom.label"/>}
					verdi={<span className="dato">
							&nbsp;<FormattedDate value={tom} day="numeric" month="long" year="numeric" />
						</span>}
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
