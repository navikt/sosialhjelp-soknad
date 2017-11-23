import * as React from "react";
import Systeminfo from "../../../nav-soknad/components/systeminfo";
import Detaljeliste, {
	Detalje
} from "../../../nav-soknad/components/detaljeliste";

interface Props {
	navn: string;
	fnr: string;
	statsborgerskap: string;
}

const PersonaliaTPS: React.StatelessComponent<Props> = ({
	navn,
	fnr,
	statsborgerskap
}) => {
	const detaljer: Detalje[] = [
		{
			tittel: "Navn",
			verdi: navn
		}
	];
	if (fnr) {
		detaljer.push({ tittel: "Fødselsnummer", verdi: fnr });
	}
	if (fnr) {
		detaljer.push({
			tittel: "Statsborgerskap",
			verdi: statsborgerskap,
			className: "tekst-capitalize"
		});
	}

	return (
		<Systeminfo>
			<Detaljeliste detaljer={detaljer} />
		</Systeminfo>
	);
};

export default PersonaliaTPS;
