import * as React from "react";

import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import CheckboxFaktum, {
	createCheckboxFaktumKey
} from "../../../nav-soknad/faktum/CheckboxFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import {
	radioCheckKeys,
	faktumIsSelected,
	getFaktumVerdi
} from "../../../nav-soknad/utils";
import { getMaksLengdeFunc } from "../../../nav-soknad/validering/valideringer";
import NivaTreSkjema from "../../../nav-soknad/components/nivaTreSkjema";

class Eiendeler extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const eiendeler = radioCheckKeys("inntekt.eierandeler");
		const hvilkeEiendeler = radioCheckKeys("inntekt.eierandeler.true.type");
		const hvilkeEiendelerAnnet = "inntekt.eierandeler.true.type.annet";
		return (
			<JaNeiSporsmalFaktum faktumKey={eiendeler.faktum}>
				<SporsmalFaktum faktumKey={hvilkeEiendeler.faktum}>
					<CheckboxFaktum
						id="eiendeler_bolig_checkbox"
						faktumKey={createCheckboxFaktumKey(hvilkeEiendeler.faktum, "bolig")}
						visPanel={true}
					/>
					<CheckboxFaktum
						id="eiendeler_campingvogn_checkbox"
						faktumKey={createCheckboxFaktumKey(
							hvilkeEiendeler.faktum,
							"campingvogn"
						)}
						visPanel={true}
					/>
					<CheckboxFaktum
						id="eiendeler_kjoretoy_checkbox"
						faktumKey={createCheckboxFaktumKey(
							hvilkeEiendeler.faktum,
							"kjoretoy"
						)}
						visPanel={true}
					/>
					<CheckboxFaktum
						id="eiendeler_fritidseiendom_checkbox"
						faktumKey={createCheckboxFaktumKey(
							hvilkeEiendeler.faktum,
							"fritidseiendom"
						)}
						visPanel={true}
					/>
					<CheckboxFaktum
						id="eiendeler_annet_checkbox"
						faktumKey={createCheckboxFaktumKey(hvilkeEiendeler.faktum, "annet")}
						visPanel={true}
					/>
					<NivaTreSkjema
						visible={faktumIsSelected(getFaktumVerdi(fakta, hvilkeEiendelerAnnet))}
						size="small"
						>
						<TextareaFaktum
							id="eiendeler_annet_textarea"
							faktumKey={`${hvilkeEiendelerAnnet}.true.beskrivelse`}
							maxLength={400}
							validerFunc={[getMaksLengdeFunc(400)]}
						/>
					</NivaTreSkjema>
				</SporsmalFaktum>
			</JaNeiSporsmalFaktum>
		);
	}
}

export default Eiendeler;
