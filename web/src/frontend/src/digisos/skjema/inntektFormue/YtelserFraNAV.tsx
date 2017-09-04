import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import { radioCheckKeys } from "../../../nav-skjema/utils";
import RadioFaktum from "../../../nav-skjema/faktum/RadioFaktum";

class YtelserFraNAV extends React.Component<{}, {}> {
	render() {
		const mottarYtelser = radioCheckKeys("inntekt.mottarytelser");
		return (
			<Sporsmal sporsmalId={mottarYtelser.sporsmal}>
				<RadioFaktum faktumKey={mottarYtelser.faktum} option="true" />
				<RadioFaktum faktumKey={mottarYtelser.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default YtelserFraNAV;
