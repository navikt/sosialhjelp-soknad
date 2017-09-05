import * as React from "react";
import Sporsmal from "../../../nav-soknad/components/sporsmal";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { faktumIsSelected, radioCheckKeys } from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import SkjemagruppeFaktum from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";

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
