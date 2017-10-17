import * as React from "react";

import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import CheckboxFaktum, {
	createCheckboxFaktumKey
} from "../../../nav-soknad/faktum/CheckboxFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
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
		const hvilkeEiendeler = radioCheckKeys("inntekt.eierandeler");
		const hvilkeEiendelerAnnet = "inntekt.eierandeler.annet";
		return (
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
		);
	}
}

export default Eiendeler;
