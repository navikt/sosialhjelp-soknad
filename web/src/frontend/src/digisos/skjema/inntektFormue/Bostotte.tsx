import * as React from "react";

import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { radioCheckKeys } from "../../../nav-soknad/utils";

class Bostotte extends React.Component<FaktumComponentProps, {}> {
	render() {
		const bostotte = radioCheckKeys("inntekt.bostotte");
		return (
			<JaNeiSporsmalFaktum
				faktumKey={bostotte.faktum}
				fakta={this.props.fakta}
			/>
		);
	}
}

export default Bostotte;
