import * as React from "react";

import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import { radioCheckKeys } from "../../../nav-soknad/utils";

class Bostotte extends React.Component<FaktumComponentProps, {}> {
	render() {
		const bostotte = radioCheckKeys("inntekt.bostotte");
		return (
			<SporsmalFaktum faktumKey={bostotte.faktum}>
				<RadioFaktum faktumKey={bostotte.faktum} value="true" />
				<RadioFaktum faktumKey={bostotte.faktum} value="false" />
			</SporsmalFaktum>
		);
	}
}

export default Bostotte;
