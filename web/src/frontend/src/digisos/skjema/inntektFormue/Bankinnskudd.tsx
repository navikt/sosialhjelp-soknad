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

class Bankinnskudd extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const innskudd = radioCheckKeys("inntekt.bankinnskudd");
		const hvilkeInnskudd = radioCheckKeys("inntekt.bankinnskudd.true.type");
		const hvilkeInnskuddAnnet = "inntekt.bankinnskudd.true.type.annet";
		return (
			<JaNeiSporsmalFaktum faktumKey={innskudd.faktum}>
				<SporsmalFaktum faktumKey={hvilkeInnskudd.faktum}>
					<CheckboxFaktum
						id="bankinnskudd_brukskonto_checkbox"
						faktumKey={createCheckboxFaktumKey(
							hvilkeInnskudd.faktum,
							"brukskonto"
						)}
					/>
					<CheckboxFaktum
						id="bankinnskudd_sparekonto_checkbox"
						faktumKey={createCheckboxFaktumKey(
							hvilkeInnskudd.faktum,
							"sparekonto"
						)}
					/>
					<CheckboxFaktum
						id="bankinnskudd_bsu_checkbox"
						faktumKey={createCheckboxFaktumKey(hvilkeInnskudd.faktum, "bsu")}
					/>
					<CheckboxFaktum
						id="bankinnskudd_livsforsikring_checkbox"
						faktumKey={createCheckboxFaktumKey(
							hvilkeInnskudd.faktum,
							"livsforsikring"
						)}
					/>
					<CheckboxFaktum
						id="bankinnskudd_aksjer_checkbox"
						faktumKey={createCheckboxFaktumKey(hvilkeInnskudd.faktum, "aksjer")}
					/>
					<CheckboxFaktum
						id="bankinnskudd_annet_checkbox"
						faktumKey={createCheckboxFaktumKey(hvilkeInnskudd.faktum, "annet")}
					/>
					<NivaTreSkjema
						visible={faktumIsSelected(getFaktumVerdi(fakta, hvilkeInnskuddAnnet))}
						size="small"
					>
						<TextareaFaktum
							id="bankinnskudd_annet_textarea"
							faktumKey={`${hvilkeInnskuddAnnet}.true.beskrivelse`}
							maxLength={400}
							validerFunc={[getMaksLengdeFunc(400)]}
						/>
					</NivaTreSkjema>
				</SporsmalFaktum>
			</JaNeiSporsmalFaktum>
		);
	}
}

export default Bankinnskudd;
