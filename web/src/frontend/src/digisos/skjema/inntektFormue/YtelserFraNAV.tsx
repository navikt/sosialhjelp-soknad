import * as React from "react";
import Sporsmal from "../../../nav-soknad/components/sporsmal";
import { radioCheckKeys } from "../../../nav-soknad/utils";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";

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
