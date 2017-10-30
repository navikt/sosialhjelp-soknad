import * as React from "react";

import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import {
	faktumIsSelected,
	getFaktumVerdi,
	radioCheckKeys
} from "../../../nav-soknad/utils";

class Jobb extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		const jobb = radioCheckKeys("dinsituasjon.jobb");
		const jobber = radioCheckKeys("dinsituasjon.jobb.true.grad");
		return (
			<SporsmalFaktum faktumKey={jobb.faktum}>
				<RadioFaktum faktumKey={jobb.faktum} value="true" />
				<Underskjema
					visible={faktumIsSelected(getFaktumVerdi(fakta, jobb.faktum))}
				>
					<SporsmalFaktum faktumKey={jobber.faktum}>
						<RadioFaktum faktumKey={jobber.faktum} value="heltid" />
						<RadioFaktum faktumKey={jobber.faktum} value="deltid" />
					</SporsmalFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={jobb.faktum} value="false" />
			</SporsmalFaktum>
		);
	}
}

export default Jobb;
