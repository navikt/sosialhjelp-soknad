import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../skjema/reducer";
import { radioCheckKeys, faktumIsSelected } from "../../../skjema/utils";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumCheckbox from "../../../skjema/faktum/FaktumCheckbox";
import FaktumTextarea from "../../../skjema/faktum/FaktumTextarea";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

class Eiendeler extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const eiendeler = radioCheckKeys("inntekt.eierandeler");
		const hvilkeEiendeler = radioCheckKeys("inntekt.eierandeler.true");
		const hvilkeEiendelerAnnet = "inntekt.eierandeler.true.annet";
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
								faktumKey={`${hvilkeEiendelerAnnet}.beskrivelse`}
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
