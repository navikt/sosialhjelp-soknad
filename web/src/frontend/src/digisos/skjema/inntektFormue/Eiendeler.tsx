import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../nav-skjema/redux/reducer";
import { radioCheckKeys, faktumIsSelected } from "../../../nav-skjema/utils";

import RadioFaktum from "../../../nav-skjema/faktum/RadioFaktum";
import CheckboxFaktum from "../../../nav-skjema/faktum/CheckboxFaktum";
import TextareaFaktum from "../../../nav-skjema/faktum/TextareaFaktum";
import SkjemagruppeFaktum from "../../../nav-skjema/faktum/SkjemagruppeFaktum";
import Underskjema from "../../../nav-skjema/components/underskjema";

class Eiendeler extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const eiendeler = radioCheckKeys("inntekt.eierandeler");
		const hvilkeEiendeler = radioCheckKeys("inntekt.eierandeler.true.type");
		const hvilkeEiendelerAnnet = "inntekt.eierandeler.true.type.annet";
		return (
			<Sporsmal sporsmalId={eiendeler.sporsmal}>
				<RadioFaktum faktumKey={eiendeler.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(fakta.get(eiendeler.faktum))}>
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
						{faktumIsSelected(fakta.get(hvilkeEiendelerAnnet)) ? (
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
