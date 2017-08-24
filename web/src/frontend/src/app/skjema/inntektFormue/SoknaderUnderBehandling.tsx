import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { radioCheckKeys } from "../../../skjema/utils";
import FaktumRadio from "../../../skjema/faktum/FaktumRadio";

class SoknaderUnderBehandling extends React.Component<{}, {}> {
	render() {
		const soknader = radioCheckKeys("inntekt.soktytelser");
		return (
			<Sporsmal sporsmalId={soknader.sporsmal}>
				<FaktumRadio faktumKey={soknader.faktum} value="false" />
				<FaktumRadio faktumKey={soknader.faktum} value="true" />
			</Sporsmal>
		);
	}
}

export default SoknaderUnderBehandling;
