import * as React from "react";
import Sporsmal from "../../../nav-soknad/components/sporsmal";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { radioCheckKeys, faktumIsSelected, getFaktumVerdi } from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import CheckboxFaktum from "../../../nav-soknad/faktum/CheckboxFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import SkjemagruppeFaktum from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";

class Eiendeler extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const eiendeler = radioCheckKeys("inntekt.eierandeler");
		const hvilkeEiendeler = radioCheckKeys("inntekt.eierandeler.true.type");
		const hvilkeEiendelerAnnet = "inntekt.eierandeler.true.type.annet";
		return (
			<Sporsmal
				sporsmalId={eiendeler.sporsmal}
				hjelpetekstId={eiendeler.hjelpetekst}
			>
				<RadioFaktum faktumKey={eiendeler.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(getFaktumVerdi(fakta, eiendeler.faktum))}>
					<SkjemagruppeFaktum tittelId={hvilkeEiendeler.sporsmal}>
						<CheckboxFaktum faktumKey={hvilkeEiendeler.faktum} option="bolig" />
						<CheckboxFaktum
							faktumKey={hvilkeEiendeler.faktum}
							option="campingvogn"
						/>
						<CheckboxFaktum
							faktumKey={hvilkeEiendeler.faktum}
							option="kjoretoy"
						/>
						<CheckboxFaktum
							faktumKey={hvilkeEiendeler.faktum}
							option="fritidseiendom"
						/>
						<CheckboxFaktum faktumKey={hvilkeEiendeler.faktum} option="annet" />
						{faktumIsSelected(getFaktumVerdi(fakta, hvilkeEiendelerAnnet)) ? (
							<TextareaFaktum
								faktumKey={`${hvilkeEiendelerAnnet}.true.beskrivelse`}
							/>
						) : null}
					</SkjemagruppeFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={eiendeler.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default Eiendeler;
