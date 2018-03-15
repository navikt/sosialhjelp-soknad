import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
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
				<RadioFaktum id="sivilstatus_gift_radio" faktumKey={sivilstatus.faktum} value="gift" />
				<Underskjema
					visible={getFaktumVerdi(fakta, sivilstatus.faktum) === "gift"}
				>
					<SporsmalFaktum faktumKey="familie.sivilstatus.gift.ektefelle">
						<Ektefelle fakta={fakta} />
					</SporsmalFaktum>
				</Underskjema>
				<RadioFaktum id="sivilstatus_ugift_radio" faktumKey={sivilstatus.faktum} value="ugift" />
				<RadioFaktum id="sivilstatus_samboer_radio" faktumKey={sivilstatus.faktum} value="samboer" />
				<RadioFaktum id="sivilstatus_enke_radio" faktumKey={sivilstatus.faktum} value="enke" />
				<RadioFaktum id="sivilstatus_skilt_radio" faktumKey={sivilstatus.faktum} value="skilt" />
				<RadioFaktum id="sivilstatus_separert_radio" faktumKey={sivilstatus.faktum} value="separert" />
			</SporsmalFaktum>
		);
	}
}

export default Sivilstatus;
