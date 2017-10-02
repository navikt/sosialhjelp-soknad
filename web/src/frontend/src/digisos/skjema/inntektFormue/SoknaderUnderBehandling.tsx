import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import { radioCheckKeys } from "../../../nav-soknad/utils";

class SoknaderUnderBehandling extends React.Component<{}, {}> {
	render() {
		const soknader = radioCheckKeys("inntekt.soktytelser");
		return (
			<SporsmalFaktum faktumKey={soknader.faktum}>
				<RadioFaktum faktumKey={soknader.faktum} value="true" />
				<RadioFaktum faktumKey={soknader.faktum} value="false" />
			</SporsmalFaktum>
		);
	}
}

export default SoknaderUnderBehandling;
