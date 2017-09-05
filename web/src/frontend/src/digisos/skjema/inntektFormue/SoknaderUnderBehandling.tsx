import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { radioCheckKeys } from "../../../nav-soknad/utils";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";

class SoknaderUnderBehandling extends React.Component<{}, {}> {
	render() {
		const soknader = radioCheckKeys("inntekt.soktytelser");
		return (
			<SporsmalFaktum faktumId={soknader.sporsmal}>
				<RadioFaktum faktumKey={soknader.faktum} option="true" />
				<RadioFaktum faktumKey={soknader.faktum} option="false" />
			</SporsmalFaktum>
		);
	}
}

export default SoknaderUnderBehandling;
