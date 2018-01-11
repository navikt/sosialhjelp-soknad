import * as React from "react";
import { getFaktumPropertyVerdi } from "../../../nav-soknad/utils";
import Detaljeliste, { DetaljelisteElement } from "../../../nav-soknad/components/detaljeliste";
import { FormattedMessage } from "react-intl";
import { Faktum } from "../../../nav-soknad/types";

const ArbeidsforholdDetaljer: React.StatelessComponent<{ arbeidsforhold: Faktum }> = ({ arbeidsforhold }) => {

	let stillingsprosent = getFaktumPropertyVerdi(arbeidsforhold, "stillingsprosent");
	if (stillingsprosent === "0" && getFaktumPropertyVerdi(arbeidsforhold, "stillingstype") === "variabel") {
		stillingsprosent = "Variabel";
	}

	return (
		<Detaljeliste>
			<DetaljelisteElement
				tittel={
					<FormattedMessage id="arbeidsforhold.arbeidsgivernavn.label"/>
				}
				verdi={getFaktumPropertyVerdi(arbeidsforhold, "arbeidsgivernavn")}
			/>
			<DetaljelisteElement
				tittel={
					<FormattedMessage id="arbeidsforhold.fom.label"/>
				}
				verdi={getFaktumPropertyVerdi(arbeidsforhold, "fom")}
			/>
			<DetaljelisteElement
				tittel={
					<FormattedMessage id="arbeidsforhold.tom.label"/>
				}
				verdi={getFaktumPropertyVerdi(arbeidsforhold, "tom")}
			/>
			<DetaljelisteElement
				tittel={
					<FormattedMessage
						id="arbeidsforhold.stillingsprosent.label"/>
				}
				verdi={stillingsprosent}
			/>
		</Detaljeliste>
	);
};

export default ArbeidsforholdDetaljer;
