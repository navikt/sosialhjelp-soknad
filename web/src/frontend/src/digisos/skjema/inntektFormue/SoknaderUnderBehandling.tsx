import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import { radioCheckKeys } from "../../../nav-skjema/utils";
import RadioFaktum from "../../../nav-skjema/faktum/RadioFaktum";

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
