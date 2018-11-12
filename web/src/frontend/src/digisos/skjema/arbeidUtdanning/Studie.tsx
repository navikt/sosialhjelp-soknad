import * as React from "react";

import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import {radioCheckKeys} from "../../../nav-soknad/utils";
import {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";

const Studie: React.StatelessComponent = () => {
	const studie = radioCheckKeys("dinsituasjon.studerer");
	const studerer = radioCheckKeys("dinsituasjon.studerer.true.grad");
	return (
		<JaNeiSporsmalFaktum faktumKey={studie.faktum} legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
			<SporsmalFaktum faktumKey={studerer.faktum}>
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
