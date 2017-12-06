import * as React from "react";

import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { radioCheckKeys } from "../../../nav-soknad/utils";

class Studie extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		const studie = radioCheckKeys("dinsituasjon.studerer");
		const studerer = radioCheckKeys("dinsituasjon.studerer.true.grad");
		return (
			<JaNeiSporsmalFaktum faktumKey={studie.faktum} fakta={fakta}>
				<SporsmalFaktum faktumKey={studerer.faktum}>
					<RadioFaktum faktumKey={studerer.faktum} value="heltid" />
					<RadioFaktum faktumKey={studerer.faktum} value="deltid" />
				</SporsmalFaktum>
			</JaNeiSporsmalFaktum>
		);
	}
}

export default Studie;
