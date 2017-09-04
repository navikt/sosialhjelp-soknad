import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../nav-skjema/redux/reducer";
import { faktumIsSelected, radioCheckKeys } from "../../../nav-skjema/utils";

import RadioFaktum from "../../../nav-skjema/faktum/RadioFaktum";
import SkjemagruppeFaktum from "../../../nav-skjema/faktum/SkjemagruppeFaktum";
import Underskjema from "../../../nav-skjema/components/underskjema";

class Jobb extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		const jobb = radioCheckKeys("dinsituasjon.jobb");
		const jobber = radioCheckKeys("dinsituasjon.jobb.true.grad");
		return (
			<Sporsmal sporsmalId={jobb.sporsmal}>
				<RadioFaktum faktumKey={jobb.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(fakta.get(jobb.faktum))}>
					<SkjemagruppeFaktum tittelId={jobber.sporsmal}>
						<RadioFaktum faktumKey={jobber.faktum} option="heltid" />
						<RadioFaktum faktumKey={jobber.faktum} option="deltid" />
					</SkjemagruppeFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={jobb.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default Jobb;
