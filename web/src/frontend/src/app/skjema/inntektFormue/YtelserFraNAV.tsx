import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { radioCheckKeys } from "../../../skjema/utils";
import FaktumRadio from "../../../skjema/faktum/FaktumRadio";

class YtelserFraNAV extends React.Component<{}, {}> {
	render() {
		const mottarYtelser = radioCheckKeys("inntekt.mottarytelser");
		return (
			<Sporsmal sporsmalId={mottarYtelser.sporsmal}>
				<FaktumRadio faktumKey={mottarYtelser.faktum} option="true" />
				<FaktumRadio faktumKey={mottarYtelser.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default YtelserFraNAV;
