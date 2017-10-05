import * as React from "react";

import PersonFaktum from "../../../nav-soknad/faktum/PersonFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import NivaTreSkjema from "../../../nav-soknad/components/nivaTreSkjema";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import { radioCheckKeys } from "../../../nav-soknad/utils";
import { getMaksLengdeFunc } from "../../../nav-soknad/validering/valideringer";
import { getPropertyVerdi } from "../../../nav-soknad/utils/faktumUtils";

class Ektefelle extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const faktumKey = "familie.sivilstatus.gift.ektefelle";
		const borsammen = radioCheckKeys(`${faktumKey}.borsammen`);
		return (
			<div>
				<div className="blokk-s">
					<PersonFaktum
						faktumKey="familie.sivilstatus.gift.ektefelle"
						validering={{
							navnRequired: true,
							fnrRequired: true
						}}
					/>
				</div>
				<SporsmalFaktum faktumKey={borsammen.faktum}>
					<RadioFaktum faktumKey={faktumKey} property="borsammen" value="true" />
					<RadioFaktum faktumKey={faktumKey} property="borsammen" value="false" />
					<NivaTreSkjema
						visible={getPropertyVerdi(fakta, faktumKey, "borsammen") === "false"}>
						<TextareaFaktum
							faktumKey={faktumKey}
							property="ikkesammenbeskrivelse"
							maxLength={400}
							validerFunc={[getMaksLengdeFunc(400)]}
						/>
					</NivaTreSkjema>
				</SporsmalFaktum>
			</div>
		);
	}
}

export default Ektefelle;
