import * as React from "react";

import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import { radioCheckKeys } from "../../../nav-soknad/utils";
import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";

const Jobb: React.StatelessComponent = () => {
	const jobb = radioCheckKeys("dinsituasjon.jobb");
	const jobber = radioCheckKeys("dinsituasjon.jobb.true.grad");
	return (
		<JaNeiSporsmalFaktum faktumKey={jobb.faktum}>
			<SporsmalFaktum faktumKey={jobber.faktum}>
				<RadioFaktum faktumKey={jobber.faktum} value="heltid" />
				<RadioFaktum faktumKey={jobber.faktum} value="deltid" />
			</SporsmalFaktum>
		</JaNeiSporsmalFaktum>
	);
};

export default Jobb;
