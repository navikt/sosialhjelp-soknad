import * as React from "react";
import PersonFaktum from "../../../nav-soknad/faktum/PersonFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import { getFaktumVerdi, radioCheckKeys } from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import NivaTreSkjema from "../../../nav-soknad/components/nivaTreSkjema";
import { getMaksLengdeFunc } from "../../../nav-soknad/validering/valideringer";

class Ektefelle extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const borsammen = radioCheckKeys("familie.sivilstatus.gift.borsammen");
		return (
			<div>
				<div className="blokk-s">
					<PersonFaktum
						faktumKey="familie.sivilstatus.gift"
						validering={{
							navnRequired: true,
							fnrRequired: true
						}}
					/>
				</div>
				<SporsmalFaktum faktumKey={borsammen.faktum} required={true}>
					<RadioFaktum faktumKey={borsammen.faktum} value="true" />
					<RadioFaktum faktumKey={borsammen.faktum} value="false" />
					<NivaTreSkjema
						visible={getFaktumVerdi(fakta, borsammen.faktum) === "false"}>
						<TextareaFaktum
							faktumKey={`${borsammen.faktum}.false.beskrivelse`}
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
