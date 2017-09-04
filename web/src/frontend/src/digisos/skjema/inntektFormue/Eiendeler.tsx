import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../nav-skjema/redux/reducer";
import { radioCheckKeys, faktumIsSelected } from "../../../nav-skjema/utils";

import FaktumRadio from "../../../nav-skjema/faktum/FaktumRadio";
import FaktumCheckbox from "../../../nav-skjema/faktum/FaktumCheckbox";
import FaktumTextarea from "../../../nav-skjema/faktum/FaktumTextarea";
import FaktumSkjemagruppe from "../../../nav-skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../nav-skjema/components/underskjema";

class Eiendeler extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const eiendeler = radioCheckKeys("inntekt.eierandeler");
		const hvilkeEiendeler = radioCheckKeys("inntekt.eierandeler.true.type");
		const hvilkeEiendelerAnnet = "inntekt.eierandeler.true.type.annet";
		return (
			<Sporsmal sporsmalId={eiendeler.sporsmal}>
				<FaktumRadio faktumKey={eiendeler.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(fakta.get(eiendeler.faktum))}>
					<FaktumSkjemagruppe tittelId={hvilkeEiendeler.sporsmal}>
						<FaktumCheckbox faktumKey={hvilkeEiendeler.faktum} option="bolig" />
						<FaktumCheckbox
							faktumKey={hvilkeEiendeler.faktum}
							option="campingvogn"
						/>
						<FaktumCheckbox
							faktumKey={hvilkeEiendeler.faktum}
							option="kjoretoy"
						/>
						<FaktumCheckbox
							faktumKey={hvilkeEiendeler.faktum}
							option="fritidseiendom"
						/>
						<FaktumCheckbox faktumKey={hvilkeEiendeler.faktum} option="annet" />
						{faktumIsSelected(fakta.get(hvilkeEiendelerAnnet)) ? (
							<FaktumTextarea
								faktumKey={`${hvilkeEiendelerAnnet}.true.beskrivelse`}
							/>
						) : null}
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey={eiendeler.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default Eiendeler;
