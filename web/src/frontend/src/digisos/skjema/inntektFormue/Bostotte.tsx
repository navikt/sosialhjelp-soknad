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
import Underskjema from "../../../nav-soknad/components/underskjema";
import { pakrevd } from "../../../nav-soknad/validering/valideringer";

class Bostotte extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const bostotte = radioCheckKeys("inntekt.bostotte");
		const hvilkenStotte = radioCheckKeys("inntekt.bostotte.true.type");
		return (
			<SporsmalFaktum faktumKey={bostotte.faktum} validerFunc={[pakrevd]}>
				<RadioFaktum faktumKey={bostotte.faktum} value="true" />
				<Underskjema
					visible={faktumIsSelected(getFaktumVerdi(fakta, "inntekt.bostotte"))}>
					<SporsmalFaktum faktumKey={hvilkenStotte.faktum}>
						{/*TODO legge til checkboxgroup-faktum*/}
						<CheckboxFaktum
							faktumKey={createCheckboxFaktumKey(
								hvilkenStotte.faktum,
								"husbanken"
							)}
						/>
						<CheckboxFaktum
							faktumKey={createCheckboxFaktumKey(
								hvilkenStotte.faktum,
								"kommunal"
							)}
						/>
					</SporsmalFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={bostotte.faktum} value="false" />
			</SporsmalFaktum>
		);
	}
}

export default Bostotte;
