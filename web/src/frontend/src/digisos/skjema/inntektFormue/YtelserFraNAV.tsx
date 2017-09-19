import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { radioCheckKeys } from "../../../nav-soknad/utils";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import { pakrevd } from "../../../nav-soknad/validering/valideringer";

class YtelserFraNAV extends React.Component<{}, {}> {
	render() {
		const mottarYtelser = radioCheckKeys("inntekt.mottarytelser");
		return (
			<SporsmalFaktum faktumKey={mottarYtelser.faktum} validerFunc={[pakrevd]}>
				<RadioFaktum faktumKey={mottarYtelser.faktum} value="true" />
				<RadioFaktum faktumKey={mottarYtelser.faktum} value="false" />
			</SporsmalFaktum>
		);
	}
}

export default YtelserFraNAV;
