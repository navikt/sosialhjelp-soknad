import * as React from "react";
import PersonFaktum from "../../../nav-soknad/faktum/PersonFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { radioCheckKeys } from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import SkjemagruppeFaktum from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import NivaTreSkjema from "../../../nav-soknad/components/nivaTreSkjema";

class Ektefelle extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const borsammen = radioCheckKeys("familie.sivilstatus.gift.borsammen");
		return (
			<div>
				<PersonFaktum faktumKey="familie.sivilstatus.gift" />
				<SkjemagruppeFaktum faktumId={borsammen.faktum}>
					<RadioFaktum faktumKey={borsammen.faktum} option="true" />
					<RadioFaktum faktumKey={borsammen.faktum} option="false" />
					<NivaTreSkjema visible={fakta.get(borsammen.faktum) === "false"}>
						<TextareaFaktum
							faktumKey={`${borsammen.faktum}.false.beskrivelse`}
						/>
					</NivaTreSkjema>
				</SkjemagruppeFaktum>
			</div>
		);
	}
}

export default Ektefelle;
