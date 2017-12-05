import * as React from "react";

import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { radioCheckKeys } from "../../../nav-soknad/utils";

import Barneinfo from "./Barneinfo";
import Barnebidrag from "./Barnebidrag";

class HarBarn extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const barn = radioCheckKeys("familie.barn");

		return (
			<JaNeiSporsmalFaktum faktumKey={barn.faktum} fakta={fakta}>
				<Barnebidrag />
				<Barneinfo
					{...this.props}
					faktumKey="familie.barn.true.barn"
					parentFaktumKey={barn.faktum}
					nummer={1}
				/>
			</JaNeiSporsmalFaktum>
		);
	}
}

export default HarBarn;
