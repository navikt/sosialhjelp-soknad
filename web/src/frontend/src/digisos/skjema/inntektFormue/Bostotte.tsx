import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { radioCheckKeys, faktumIsSelected } from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import CheckboxFaktum from "../../../nav-soknad/faktum/CheckboxFaktum";
import SkjemagruppeFaktum from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";

class Bostotte extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const bostotte = radioCheckKeys("inntekt.bostotte");
		const hvilkenStotte = radioCheckKeys("inntekt.bostotte.true.type");
		return (
			<SporsmalFaktum faktumId={bostotte.faktum}>
				<RadioFaktum faktumKey={bostotte.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(fakta.get("inntekt.bostotte"))}>
					<SkjemagruppeFaktum faktumId={hvilkenStotte.faktum}>
						{/*TODO legge til checkboxgroup-faktum*/}
						<CheckboxFaktum
							faktumKey={hvilkenStotte.faktum}
							option="husbanken"
						/>
						<CheckboxFaktum
							faktumKey={hvilkenStotte.faktum}
							option="kommunal"
						/>
					</SkjemagruppeFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={bostotte.faktum} option="false" />
			</SporsmalFaktum>
		);
	}
}

export default Bostotte;
