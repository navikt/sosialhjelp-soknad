import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { radioCheckKeys } from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import SkjemagruppeFaktum from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";
import Ektefelle from "./Ektefelle";

class Sivilstatus extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const sivilstatus = radioCheckKeys("familie.sivilstatus");
		return (
			<SporsmalFaktum faktumId={sivilstatus.faktum}>
				<RadioFaktum faktumKey={sivilstatus.faktum} option="gift" />
				<Underskjema visible={fakta.get(sivilstatus.faktum) === "gift"}>
					<SkjemagruppeFaktum faktumId="familie.sivilstatus.gift">
						<Ektefelle fakta={fakta} />
					</SkjemagruppeFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={sivilstatus.faktum} option="ugift" />
				<RadioFaktum faktumKey={sivilstatus.faktum} option="samboer" />
				<RadioFaktum faktumKey={sivilstatus.faktum} option="enke" />
				<RadioFaktum faktumKey={sivilstatus.faktum} option="skilt" />
			</SporsmalFaktum>
		);
	}
}

export default Sivilstatus;
