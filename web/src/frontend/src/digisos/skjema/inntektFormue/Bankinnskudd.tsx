import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import {
	radioCheckKeys,
	faktumIsSelected,
	getFaktumVerdi
} from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import CheckboxFaktum, {
	createCheckboxFaktumKey
} from "../../../nav-soknad/faktum/CheckboxFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";

class Bankinnskudd extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const innskudd = radioCheckKeys("inntekt.bankinnskudd");
		const hvilkeInnskudd = radioCheckKeys("inntekt.bankinnskudd.true.type");
		const hvilkeInnskuddAnnet = "inntekt.bankinnskudd.true.type.annet";
		return (
			<SporsmalFaktum faktumKey={innskudd.faktum}>
				<RadioFaktum faktumKey={innskudd.faktum} value="true" />
				<Underskjema
					visible={faktumIsSelected(getFaktumVerdi(fakta, innskudd.faktum))}>
					<SporsmalFaktum faktumKey={hvilkeInnskudd.faktum}>
						{/*TODO checkboxbgroup-faktum*/}
						<CheckboxFaktum
							faktumKey={createCheckboxFaktumKey(
								hvilkeInnskudd.faktum,
								"brukskonto"
							)}
						/>
						<CheckboxFaktum
							faktumKey={createCheckboxFaktumKey(
								hvilkeInnskudd.faktum,
								"sparekonto"
							)}
						/>
						<CheckboxFaktum
							faktumKey={createCheckboxFaktumKey(
								hvilkeInnskudd.faktum,
								"livsforsikring"
							)}
						/>
						<CheckboxFaktum
							faktumKey={createCheckboxFaktumKey(
								hvilkeInnskudd.faktum,
								"aksjer"
							)}
						/>
						<CheckboxFaktum
							faktumKey={createCheckboxFaktumKey(
								hvilkeInnskudd.faktum,
								"annet"
							)}
						/>
						{faktumIsSelected(getFaktumVerdi(fakta, hvilkeInnskuddAnnet)) ? (
							<TextareaFaktum
								faktumKey={`${hvilkeInnskuddAnnet}.true.beskrivelse`}
							/>
						) : null}
					</SporsmalFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={innskudd.faktum} value="false" />
			</SporsmalFaktum>
		);
	}
}

export default Bankinnskudd;
