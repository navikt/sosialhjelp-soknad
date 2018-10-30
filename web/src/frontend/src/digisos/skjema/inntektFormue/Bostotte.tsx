import * as React from "react";

import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";
import {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";

const Bostotte: React.StatelessComponent = () => (
	<JaNeiSporsmalFaktum faktumKey="inntekt.bostotte" legendTittelStyle={LegendTittleStyle.NORMAL}/>
);

export default Bostotte;
