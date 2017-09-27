import * as React from "react";
import { connect } from "react-redux";

import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";

import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import YtelserFraNAV from "./YtelserFraNAV";
import SoknaderUnderBehandling from "./SoknaderUnderBehandling";
import Bostotte from "./Bostotte";
import Eiendeler from "./Eiendeler";
import Bankinnskudd from "./Bankinnskudd";
import Utbetaling from "./Utbetaling";
import { State } from "../../redux/reducers";

class InntektFormue extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		return (
			<DigisosSkjemaSteg steg={DigisosSteg.inntektbolk}>
				<YtelserFraNAV />
				<SoknaderUnderBehandling />
				<Bostotte fakta={fakta} />
				<Eiendeler fakta={fakta} />
				<Bankinnskudd fakta={fakta} />
				<Utbetaling fakta={fakta} />
			</DigisosSkjemaSteg>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data
	};
})(InntektFormue);
