import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../nav-skjema/redux/reducer";
import { faktumIsSelected, radioCheckKeys } from "../../../nav-skjema/utils";

import RadioFaktum from "../../../nav-skjema/faktum/RadioFaktum";
import SkjemagruppeFaktum from "../../../nav-skjema/faktum/SkjemagruppeFaktum";
import Underskjema from "../../../nav-skjema/components/underskjema";

class Studie extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		const studie = radioCheckKeys("dinsituasjon.studerer");
		const studerer = radioCheckKeys("dinsituasjon.studerer.true.grad");
		return (
			<Sporsmal sporsmalId={studie.sporsmal}>
				<RadioFaktum faktumKey={studie.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(fakta.get(studie.faktum))}>
					<SkjemagruppeFaktum tittelId={studerer.sporsmal}>
						<RadioFaktum faktumKey={studerer.faktum} option="heltid" />
						<RadioFaktum faktumKey={studerer.faktum} option="deltid" />
					</SkjemagruppeFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={studie.faktum} option="false" />
			</Sporsmal>
		);
	}
}
export default Studie;
