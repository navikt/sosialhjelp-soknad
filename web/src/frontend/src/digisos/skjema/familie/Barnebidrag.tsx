import * as React from "react";

import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { radioCheckKeys } from "../../../nav-soknad/utils/faktumUtils";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";

class Barnebidrag extends React.Component<{}, {}> {
	render() {
		const barnebidrag = radioCheckKeys("familie.barn.true.barnebidrag");
		return (
			<div className="blokk barnebidrag">
				<SporsmalFaktum faktumKey={barnebidrag.faktum}>
					<RadioFaktum visPanel={true} id="familie_barnebedrag_radio_betaler" faktumKey={barnebidrag.faktum} value="betaler" />
					<RadioFaktum visPanel={true} id="familie_barnebedrag_radio_mottar" faktumKey={barnebidrag.faktum} value="mottar" />
					<RadioFaktum visPanel={true} id="familie_barnebedrag_radio_begge" faktumKey={barnebidrag.faktum} value="begge" />
					<RadioFaktum visPanel={true} id="familie_barnebedrag_radio_ingen" faktumKey={barnebidrag.faktum} value="ingen" />
				</SporsmalFaktum>
			</div>
		);
	}
}

export default Barnebidrag;
