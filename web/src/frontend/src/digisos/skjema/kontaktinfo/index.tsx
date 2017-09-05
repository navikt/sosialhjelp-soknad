import * as React from "react";
import Sporsmal from "../../../nav-soknad/components/sporsmal";
import Steg from "../../../nav-soknad/components/steg";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import InputFaktum from "../../../nav-soknad/faktum/InputFaktum";
import { radioCheckKeys } from "../../../nav-soknad/utils";

class Kontaktinfo extends React.Component<{}, {}> {
	render() {
		const statsborger = radioCheckKeys("kontakt.statsborger");
		return (
			<Steg tittelId="kontakt.tittel">
				<Sporsmal
					sporsmalId="kontakt.kontonummer.tittel"
					hjelpetekstId="kontakt.kontonummer.hjelpetekst">
					<InputFaktum faktumKey="kontakt.kontonummer" maxLength={11} />
				</Sporsmal>
				<Sporsmal
					sporsmalId="kontakt.telefon.tittel"
					hjelpetekstId="kontakt.telefon.hjelpetekst">
					<InputFaktum faktumKey="kontakt.telefon" />
				</Sporsmal>

				<Sporsmal
					sporsmalId={statsborger.sporsmal}
					hjelpetekstId={statsborger.hjelpetekst}>
					<RadioFaktum faktumKey={statsborger.faktum} option="true" />
					<RadioFaktum faktumKey={statsborger.faktum} option="false" />
				</Sporsmal>
			</Steg>
		);
	}
}

export default Kontaktinfo;
