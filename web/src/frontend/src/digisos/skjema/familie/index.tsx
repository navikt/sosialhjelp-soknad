import * as React from "react";
import { connect } from "react-redux";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { State } from "../../redux/reducers";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";

import Sivilstatus from "./Sivilstatus";
import HarBarn from "./HarBarn";
import Familierelasjoner from "./Familierelasjoner";

class Familie extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		return (
			<DigisosSkjemaSteg steg={DigisosSteg.familiebolk}>
				<Sivilstatus fakta={fakta} />
				<Familierelasjoner fakta={fakta}/>
				<HarBarn />
			</DigisosSkjemaSteg>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data,
		feil: state.validering.feil
	};
})(Familie);
