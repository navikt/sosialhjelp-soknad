import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import Steg from "../../../nav-skjema/components/steg";
import RadioFaktum from "../../../nav-skjema/faktum/RadioFaktum";
import InputFaktum from "../../../nav-skjema/faktum/InputFaktum";
import { radioCheckKeys } from "../../../nav-skjema/utils";

class Kontaktinfo extends React.Component<{}, {}> {
	render() {
		const statsborger = radioCheckKeys("kontakt.statsborger");
		return (
			<Steg tittelId="kontakt.tittel">
				<Sporsmal
					sporsmalId="kontakt.kontonummer.tittel"
					beskrivelseId="kontakt.kontonummer.beskrivelse">
					<InputFaktum faktumKey="kontakt.kontonummer" maxLength={11} />
				</Sporsmal>
				<Sporsmal
					sporsmalId="kontakt.telefon.tittel"
					beskrivelseId="kontakt.telefon.beskrivelse">
					<InputFaktum faktumKey="kontakt.telefon" />
				</Sporsmal>
				<Sporsmal sporsmalId={statsborger.sporsmal}>
					<RadioFaktum faktumKey={statsborger.faktum} option="true" />
					<RadioFaktum faktumKey={statsborger.faktum} option="false" />
				</Sporsmal>
			</Steg>
		);
	}
}

export default Kontaktinfo;
