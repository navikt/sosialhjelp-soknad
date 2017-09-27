import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
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
			<SporsmalFaktum faktumId={jobb.faktum}>
				<RadioFaktum faktumKey={jobb.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(getFaktumVerdi(fakta, jobb.faktum))}>
					<SkjemagruppeFaktum faktumId={jobber.faktum}>
						<RadioFaktum faktumKey={jobber.faktum} option="heltid" />
						<RadioFaktum faktumKey={jobber.faktum} option="deltid" />
						<RadioFaktum faktumKey={jobber.faktum} option="ikkeoppgi" />
					</SkjemagruppeFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={jobb.faktum} option="false" />
				<RadioFaktum faktumKey={jobb.faktum} option="ikkeoppgi" />

			</SporsmalFaktum>
		);
	}
}

export default Jobb;
