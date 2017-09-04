import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../skjema/reducer";
import { radioCheckKeys, faktumIsSelected } from "../../../skjema/utils";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumCheckbox from "../../../skjema/faktum/FaktumCheckbox";
import FaktumTextarea from "../../../skjema/faktum/FaktumTextarea";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

class Bankinnskudd extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const innskudd = radioCheckKeys("inntekt.bankinnskudd");
		const hvilkeInnskudd = radioCheckKeys("inntekt.bankinnskudd.true.type");
		const hvilkeInnskuddAnnet = "inntekt.bankinnskudd.true.type.annet";
		return (
			<Sporsmal sporsmalId={innskudd.sporsmal}>
				<FaktumRadio faktumKey={innskudd.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(fakta.get(innskudd.faktum))}>
					<FaktumSkjemagruppe tittelId={hvilkeInnskudd.sporsmal}>
						{/*TODO checkboxbgroup-faktum*/}
						<FaktumCheckbox
							faktumKey={hvilkeInnskudd.faktum}
							option="brukskonto"
						/>
						<FaktumCheckbox
							faktumKey={hvilkeInnskudd.faktum}
							option="sparekonto"
						/>
						<FaktumCheckbox
							faktumKey={hvilkeInnskudd.faktum}
							option="livsforsikring"
						/>
						<FaktumCheckbox faktumKey={hvilkeInnskudd.faktum} option="aksjer" />
						<FaktumCheckbox faktumKey={hvilkeInnskudd.faktum} option="annet" />
						{faktumIsSelected(fakta.get(hvilkeInnskuddAnnet)) ? (
							<FaktumTextarea
								faktumKey={`${hvilkeInnskuddAnnet}.true.beskrivelse`}
							/>
						) : null}
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey={innskudd.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default Bankinnskudd;
