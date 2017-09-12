import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import { getFaktumVerdi, radioCheckKeys } from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";
import Ektefelle from "./Ektefelle";

class Sivilstatus extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const sivilstatus = radioCheckKeys("familie.sivilstatus");
		return (
			<SporsmalFaktum faktumKey={sivilstatus.faktum}>
				<RadioFaktum faktumKey={sivilstatus.faktum} option="gift" />
				<Underskjema
					visible={getFaktumVerdi(fakta, sivilstatus.faktum) === "gift"}>
					<SporsmalFaktum faktumKey="familie.sivilstatus.gift">
						<Ektefelle fakta={fakta} />
					</SporsmalFaktum>
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
