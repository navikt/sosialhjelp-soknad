import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import Steg from "../../../skjema/components/steg";
import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumInput from "../../../skjema/faktum/FaktumInput";
import { radioCheckKeys } from "../../../skjema/utils";

class Kontaktinfo extends React.Component<{}, {}> {
	render() {
		const statsborger = radioCheckKeys("kontakt.statsborger");
		return (
			<Steg tittelId="kontakt.tittel">
				<Sporsmal
					sporsmalId="kontakt.kontonummer.tittel"
					beskrivelseId="kontakt.kontonummer.beskrivelse">
					<FaktumInput faktumKey="kontakt.kontonummer" maxLength={11} />
				</Sporsmal>
				<Sporsmal
					sporsmalId="kontakt.telefon.tittel"
					beskrivelseId="kontakt.telefon.beskrivelse">
					<FaktumInput faktumKey="kontakt.telefon" />
				</Sporsmal>
				<Sporsmal sporsmalId={statsborger.sporsmal}>
					<FaktumRadio faktumKey={statsborger.faktum} option="true" />
					<FaktumRadio faktumKey={statsborger.faktum} option="false" />
				</Sporsmal>
			</Steg>
		);
	}
}

export default Kontaktinfo;
