import * as React from "react";

import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import {
	faktumIsSelected,
	getFaktumVerdi,
	radioCheckKeys
} from "../../../nav-soknad/utils";

class Studie extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		const studie = radioCheckKeys("dinsituasjon.studerer");
		const studerer = radioCheckKeys("dinsituasjon.studerer.true.grad");
		return (
			<SporsmalFaktum faktumKey={studie.faktum}>
				<RadioFaktum faktumKey={studie.faktum} value="true" />
				<Underskjema
					visible={faktumIsSelected(getFaktumVerdi(fakta, studie.faktum))}
				>
					<SporsmalFaktum faktumKey={studerer.faktum}>
						<RadioFaktum faktumKey={studerer.faktum} value="heltid" />
						<RadioFaktum faktumKey={studerer.faktum} value="deltid" />
					</SporsmalFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={studie.faktum} value="false" />
			</SporsmalFaktum>
		);
	}
}

export default Studie;
