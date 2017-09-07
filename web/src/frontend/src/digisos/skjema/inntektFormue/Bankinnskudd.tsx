import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { radioCheckKeys, faktumIsSelected, getFaktumVerdi } from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import CheckboxFaktum from "../../../nav-soknad/faktum/CheckboxFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import SkjemagruppeFaktum from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";

class Bankinnskudd extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const innskudd = radioCheckKeys("inntekt.bankinnskudd");
		const hvilkeInnskudd = radioCheckKeys("inntekt.bankinnskudd.true.type");
		const hvilkeInnskuddAnnet = "inntekt.bankinnskudd.true.type.annet";
		return (
			<SporsmalFaktum faktumId={innskudd.faktum}>
				<RadioFaktum faktumKey={innskudd.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(getFaktumVerdi(fakta, innskudd.faktum))}>
					<SkjemagruppeFaktum faktumId={hvilkeInnskudd.faktum}>
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
						{faktumIsSelected(getFaktumVerdi(fakta, hvilkeInnskuddAnnet)) ? (
							<TextareaFaktum
								faktumKey={`${hvilkeInnskuddAnnet}.true.beskrivelse`}
							/>
						) : null}
					</SkjemagruppeFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={innskudd.faktum} option="false" />
			</SporsmalFaktum>
		);
	}
}

export default Bankinnskudd;
