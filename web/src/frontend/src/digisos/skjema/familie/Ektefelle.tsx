import * as React from "react";
import PersonFaktum from "../../../nav-skjema/faktum/PersonFaktum";
import { FaktumComponentProps } from "../../../nav-skjema/redux/reducer";
import { radioCheckKeys } from "../../../nav-skjema/utils";

import RadioFaktum from "../../../nav-skjema/faktum/RadioFaktum";
import SkjemagruppeFaktum from "../../../nav-skjema/faktum/SkjemagruppeFaktum";
import TextareaFaktum from "../../../nav-skjema/faktum/TextareaFaktum";
import NivaTreSkjema from "../../../nav-skjema/components/nivaTreSkjema";

class Ektefelle extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const borsammen = radioCheckKeys("familie.sivilstatus.gift.borsammen");
		return (
			<div>
				<PersonFaktum faktumKey="familie.sivilstatus.gift" />
				<SkjemagruppeFaktum tittelId={borsammen.sporsmal}>
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
