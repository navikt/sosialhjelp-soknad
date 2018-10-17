import * as React from "react";

import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import {radioCheckKeys} from "../../../nav-soknad/utils";

const Studie: React.StatelessComponent = () => {
	const studie = radioCheckKeys("dinsituasjon.studerer");
	const studerer = radioCheckKeys("dinsituasjon.studerer.true.grad");
	return (
		<JaNeiSporsmalFaktum faktumKey={studie.faktum} legendClassName="skjema-fieldset-large-bold" className="luftUnderFireRem">
			<SporsmalFaktum faktumKey={studerer.faktum} className="skjema-sporsmal__radio">
				<RadioFaktum
					id="studerer_radio_heltid"
					faktumKey={studerer.faktum}
					value="heltid"
				/>
				<RadioFaktum
					id="studerer_radio_deltid"
					faktumKey={studerer.faktum}
					value="deltid"
				/>
			</SporsmalFaktum>
		</JaNeiSporsmalFaktum>
	);
};

export default Studie;
