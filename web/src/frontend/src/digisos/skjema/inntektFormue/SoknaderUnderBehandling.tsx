import * as React from "react";
import Sporsmal from "../../../nav-soknad/components/sporsmal";
import { radioCheckKeys } from "../../../nav-soknad/utils";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";

class SoknaderUnderBehandling extends React.Component<{}, {}> {
	render() {
		const soknader = radioCheckKeys("inntekt.soktytelser");
		return (
			<Sporsmal sporsmalId={soknader.sporsmal}>
				<RadioFaktum faktumKey={soknader.faktum} option="true" />
				<RadioFaktum faktumKey={soknader.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default SoknaderUnderBehandling;
