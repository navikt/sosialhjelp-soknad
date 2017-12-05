import * as React from "react";

import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { radioCheckKeys } from "../../../nav-soknad/utils";
import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";

class Jobb extends React.Component<FaktumComponentProps, any> {
	render() {
		const jobb = radioCheckKeys("dinsituasjon.jobb");
		const jobber = radioCheckKeys("dinsituasjon.jobb.true.grad");
		return (
			<JaNeiSporsmalFaktum faktumKey={jobb.faktum} fakta={this.props.fakta}>
				<SporsmalFaktum faktumKey={jobber.faktum}>
					<RadioFaktum faktumKey={jobber.faktum} value="heltid" />
					<RadioFaktum faktumKey={jobber.faktum} value="deltid" />
				</SporsmalFaktum>
			</JaNeiSporsmalFaktum>
		);
	}
}

export default Jobb;
