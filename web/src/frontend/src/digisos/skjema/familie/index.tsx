import * as React from "react";
import { connect } from "react-redux";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { State } from "../../redux/reducers";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import Familierelasjoner from "./Familierelasjoner";
import FamilieIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/FamilieIllustrasjon";
import DinSivilstatus from "./sivilstatus/DinSivilstatus";

class Familie extends React.Component<FaktumComponentProps, {}> {

	render() {
		return (
			<DigisosSkjemaSteg steg={DigisosSteg.familiebolk} ikon={<FamilieIllustrasjon />}>
				<DinSivilstatus/>
				<Familierelasjoner />
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
