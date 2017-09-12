import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import {
	radioCheckKeys,
	faktumIsSelected,
	getFaktumVerdi
} from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import CheckboxFaktum from "../../../nav-soknad/faktum/CheckboxFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";

class Bostotte extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const bostotte = radioCheckKeys("inntekt.bostotte");
		const hvilkenStotte = radioCheckKeys("inntekt.bostotte.true.type");
		return (
			<SporsmalFaktum faktumKey={bostotte.faktum}>
				<RadioFaktum faktumKey={bostotte.faktum} option="true" />
				<Underskjema
					visible={faktumIsSelected(getFaktumVerdi(fakta, "inntekt.bostotte"))}>
					<SporsmalFaktum faktumKey={hvilkenStotte.faktum}>
						{/*TODO legge til checkboxgroup-faktum*/}
						<CheckboxFaktum
							faktumKey={hvilkenStotte.faktum}
							option="husbanken"
						/>
						<CheckboxFaktum
							faktumKey={hvilkenStotte.faktum}
							option="kommunal"
						/>
					</SporsmalFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={bostotte.faktum} option="false" />
			</SporsmalFaktum>
		);
	}
}

export default Bostotte;
