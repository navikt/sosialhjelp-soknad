import * as React from "react";

import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import CheckboxFaktum, {
	createCheckboxFaktumKey
} from "../../../nav-soknad/faktum/CheckboxFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import {
	radioCheckKeys,
	faktumIsSelected,
	getFaktumVerdi
} from "../../../nav-soknad/utils";
import { getMaksLengdeFunc } from "../../../nav-soknad/validering/valideringer";

class Eiendeler extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const eiendeler = radioCheckKeys("inntekt.eierandeler");
		const hvilkeEiendeler = radioCheckKeys("inntekt.eierandeler.true.type");
		const hvilkeEiendelerAnnet = "inntekt.eierandeler.true.type.annet";
		return (
			<SporsmalFaktum faktumKey={eiendeler.faktum} required={true}>
				<RadioFaktum faktumKey={eiendeler.faktum} value="true" />
				<Underskjema
					visible={faktumIsSelected(getFaktumVerdi(fakta, eiendeler.faktum))}>
					<SporsmalFaktum faktumKey={hvilkeEiendeler.faktum}>
						<CheckboxFaktum
							faktumKey={createCheckboxFaktumKey(
								hvilkeEiendeler.faktum,
								"bolig"
							)}
						/>
						<CheckboxFaktum
							faktumKey={createCheckboxFaktumKey(
								hvilkeEiendeler.faktum,
								"campingvogn"
							)}
						/>
						<CheckboxFaktum
							faktumKey={createCheckboxFaktumKey(
								hvilkeEiendeler.faktum,
								"kjoretoy"
							)}
						/>
						<CheckboxFaktum
							faktumKey={createCheckboxFaktumKey(
								hvilkeEiendeler.faktum,
								"fritidseiendom"
							)}
						/>
						<CheckboxFaktum
							faktumKey={createCheckboxFaktumKey(
								hvilkeEiendeler.faktum,
								"annet"
							)}
						/>
						{faktumIsSelected(getFaktumVerdi(fakta, hvilkeEiendelerAnnet)) ? (
							<TextareaFaktum
								faktumKey={`${hvilkeEiendelerAnnet}.true.beskrivelse`}
								maxLength={400}
								validerFunc={[getMaksLengdeFunc(400)]}
							/>
						) : null}
					</SporsmalFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={eiendeler.faktum} value="false" />
			</SporsmalFaktum>
		);
	}
}

export default Eiendeler;
