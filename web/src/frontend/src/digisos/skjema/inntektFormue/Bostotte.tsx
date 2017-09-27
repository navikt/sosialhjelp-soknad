import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { radioCheckKeys } from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";

class Bostotte extends React.Component<FaktumComponentProps, {}> {
	render() {
		const bostotte = radioCheckKeys("inntekt.bostotte");
		return (
			<SporsmalFaktum faktumId={bostotte.faktum}>
				<RadioFaktum faktumKey={bostotte.faktum} option="true" />
				<RadioFaktum faktumKey={bostotte.faktum} option="false" />
			</SporsmalFaktum>
		);
	}
}

export default Bostotte;
