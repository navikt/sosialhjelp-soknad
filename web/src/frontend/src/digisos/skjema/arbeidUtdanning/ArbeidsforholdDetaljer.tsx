import * as React from "react";
import { getFaktumPropertyVerdi } from "../../../nav-soknad/utils";
import Detaljeliste, { DetaljelisteElement } from "../../../nav-soknad/components/detaljeliste";
import { FormattedMessage } from "react-intl";
import { Faktum } from "../../../nav-soknad/types";

const ArbeidsforholdDetaljer: React.StatelessComponent<{ arbeidsforhold: Faktum }> = ({ arbeidsforhold }) => {

	let stillingsprosent = getFaktumPropertyVerdi(arbeidsforhold, "stillingsprosent");
	if (stillingsprosent === "0" && getFaktumPropertyVerdi(arbeidsforhold, "stillingstype") === "variabel") {
		stillingsprosent = "Variabel";
	} else {
		stillingsprosent = stillingsprosent + "%";
	}
	let stillingstype =  getFaktumPropertyVerdi(arbeidsforhold, "stillingstype") || "";

	const tom = getFaktumPropertyVerdi(arbeidsforhold, "tom");

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
			{tom !== "" && (
				<DetaljelisteElement
					tittel={
						<FormattedMessage id="arbeidsforhold.tom.label"/>
					}
					verdi={tom}
				/>
			)}
			<DetaljelisteElement
				tittel={
					<FormattedMessage
						id="arbeidsforhold.stillingsprosent.label"/>
				}
				verdi={stillingsprosent}
			/>
			<DetaljelisteElement
				tittel={
					<FormattedMessage
						id="arbeidsforhold.stillingstype.label"/>
				}
				verdi={stillingstype}
			/>

		</Detaljeliste>
	);
};

export default ArbeidsforholdDetaljer;
