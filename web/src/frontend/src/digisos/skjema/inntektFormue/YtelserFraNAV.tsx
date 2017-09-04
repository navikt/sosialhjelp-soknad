import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import { radioCheckKeys } from "../../../nav-skjema/utils";
import FaktumRadio from "../../../nav-skjema/faktum/FaktumRadio";

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
