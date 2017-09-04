import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../nav-skjema/redux/reducer";
import { radioCheckKeys, faktumIsSelected } from "../../../nav-skjema/utils";

import RadioFaktum from "../../../nav-skjema/faktum/RadioFaktum";
import CheckboxFaktum from "../../../nav-skjema/faktum/CheckboxFaktum";
import TextareaFaktum from "../../../nav-skjema/faktum/TextareaFaktum";
import SkjemagruppeFaktum from "../../../nav-skjema/faktum/SkjemagruppeFaktum";
import Underskjema from "../../../nav-skjema/components/underskjema";

class Bankinnskudd extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const innskudd = radioCheckKeys("inntekt.bankinnskudd");
		const hvilkeInnskudd = radioCheckKeys("inntekt.bankinnskudd.true.type");
		const hvilkeInnskuddAnnet = "inntekt.bankinnskudd.true.type.annet";
		return (
			<Sporsmal sporsmalId={innskudd.sporsmal}>
				<RadioFaktum faktumKey={innskudd.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(fakta.get(innskudd.faktum))}>
					<SkjemagruppeFaktum tittelId={hvilkeInnskudd.sporsmal}>
						{/*TODO checkboxbgroup-faktum*/}
						<CheckboxFaktum
							faktumKey={hvilkeInnskudd.faktum}
							option="brukskonto"
						/>
						<CheckboxFaktum
							faktumKey={hvilkeInnskudd.faktum}
							option="sparekonto"
						/>
						<CheckboxFaktum
							faktumKey={hvilkeInnskudd.faktum}
							option="livsforsikring"
						/>
						<CheckboxFaktum faktumKey={hvilkeInnskudd.faktum} option="aksjer" />
						<CheckboxFaktum faktumKey={hvilkeInnskudd.faktum} option="annet" />
						{faktumIsSelected(fakta.get(hvilkeInnskuddAnnet)) ? (
							<TextareaFaktum
								faktumKey={`${hvilkeInnskuddAnnet}.true.beskrivelse`}
							/>
						) : null}
					</SkjemagruppeFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={innskudd.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default Bankinnskudd;
