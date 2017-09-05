import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { radioCheckKeys } from "../../../nav-soknad/utils";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";

class YtelserFraNAV extends React.Component<{}, {}> {
	render() {
		const mottarYtelser = radioCheckKeys("inntekt.mottarytelser");
		return (
			<SporsmalFaktum faktumId={mottarYtelser.faktum}>
				<RadioFaktum faktumKey={mottarYtelser.faktum} option="true" />
				<RadioFaktum faktumKey={mottarYtelser.faktum} option="false" />
			</SporsmalFaktum>
		);
	}
}

export default YtelserFraNAV;
