import * as React from "react";

import PersonFaktum from "../../../nav-soknad/faktum/PersonFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { radioCheckKeys } from "../../../nav-soknad/utils";

class Ektefelle extends React.Component<FaktumComponentProps, {}> {

	render() {
		const faktumKey = "familie.sivilstatus.gift.ektefelle";
		const borsammen = radioCheckKeys(`${faktumKey}.borsammen`);
		return (
			<div>
				<div className="blokk-s">
					<PersonFaktum id="ektefelle" faktumKey="familie.sivilstatus.gift.ektefelle" />
				</div>
				<SporsmalFaktum faktumKey={borsammen.faktum}>
					<RadioFaktum
						id="sivilstatus_gift_bor_sammen_radio_ja"
						faktumKey={faktumKey}
						property="borsammen"
						value="true"
					/>
					<RadioFaktum
						id="sivilstatus_gift_bor_sammen_radio_nei"
						faktumKey={faktumKey}
						property="borsammen"
						value="false"
					/>
				</SporsmalFaktum>
			</div>
		);
	}
}

export default Ektefelle;
