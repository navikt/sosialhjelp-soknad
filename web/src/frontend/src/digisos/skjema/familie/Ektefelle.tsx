import * as React from "react";
import PersonFaktum from "../../../nav-soknad/faktum/PersonFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { getFaktumVerdi, radioCheckKeys } from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import NivaTreSkjema from "../../../nav-soknad/components/nivaTreSkjema";

class Ektefelle extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const borsammen = radioCheckKeys("familie.sivilstatus.gift.borsammen");
		return (
			<div>
				<PersonFaktum faktumKey="familie.sivilstatus.gift" />
				<SporsmalFaktum faktumKey={borsammen.faktum}>
					<RadioFaktum faktumKey={borsammen.faktum} option="true" />
					<RadioFaktum faktumKey={borsammen.faktum} option="false" />
					<NivaTreSkjema
						visible={getFaktumVerdi(fakta, borsammen.faktum) === "false"}>
						<TextareaFaktum
							faktumKey={`${borsammen.faktum}.false.beskrivelse`}
						/>
					</NivaTreSkjema>
				</SporsmalFaktum>
			</div>
		);
	}
}

export default Ektefelle;
