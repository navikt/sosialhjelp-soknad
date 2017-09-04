import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import { radioCheckKeys } from "../../../nav-skjema/utils";
import FaktumRadio from "../../../nav-skjema/faktum/FaktumRadio";

class SoknaderUnderBehandling extends React.Component<{}, {}> {
	render() {
		const soknader = radioCheckKeys("inntekt.soktytelser");
		return (
			<Sporsmal sporsmalId={soknader.sporsmal}>
				<FaktumRadio faktumKey={soknader.faktum} option="true" />
				<FaktumRadio faktumKey={soknader.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default SoknaderUnderBehandling;
