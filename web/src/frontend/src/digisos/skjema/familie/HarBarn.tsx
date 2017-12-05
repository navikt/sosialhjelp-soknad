import * as React from "react";

import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";
import { radioCheckKeys } from "../../../nav-soknad/utils";
import Barneinfo from "./Barneinfo";
import Barnebidrag from "./Barnebidrag";

const HarBarn: React.StatelessComponent = () => {
	const barn = radioCheckKeys("familie.barn");

	return (
		<JaNeiSporsmalFaktum faktumKey={barn.faktum}>
			<Barnebidrag />
			<Barneinfo
				faktumKey="familie.barn.true.barn"
				parentFaktumKey={barn.faktum}
				nummer={1}
			/>
		</JaNeiSporsmalFaktum>
	);
};

export default HarBarn;
