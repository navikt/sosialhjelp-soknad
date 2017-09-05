import * as React from "react";
import Sporsmal from "../../../nav-soknad/components/sporsmal";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { faktumIsSelected, getFaktumVerdi, radioCheckKeys } from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import SkjemagruppeFaktum from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";

class Jobb extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		const jobb = radioCheckKeys("dinsituasjon.jobb");
		const jobber = radioCheckKeys("dinsituasjon.jobb.true.grad");
		return (
			<Sporsmal sporsmalId={jobb.sporsmal}>
				<RadioFaktum faktumKey={jobb.faktum} option="true"/>
				<Underskjema visible={faktumIsSelected(getFaktumVerdi(fakta, jobb.faktum))}>
					<SkjemagruppeFaktum tittelId={jobber.sporsmal}>
						<RadioFaktum faktumKey={jobber.faktum} option="heltid"/>
						<RadioFaktum faktumKey={jobber.faktum} option="deltid"/>
					</SkjemagruppeFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={jobb.faktum} option="false"/>
			</Sporsmal>
		);
	}
}

export default Jobb;
