import * as React from "react";
import { connect } from "react-redux";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import Bostotte from "./Bostotte";
import Eiendeler from "./Eiendeler";
import Bankinnskudd from "./Bankinnskudd";
import Utbetaling from "./Utbetaling";
import { State } from "../../redux/reducers";
import NavYtelser from "./NavYtelser";
import HusbankInfopanel from "./HusbankInfopanel";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";

class InntektFormue extends React.Component<FaktumComponentProps & DispatchProps, any> {
	render() {
		const { fakta } = this.props;
		return (
			<DigisosSkjemaSteg steg={DigisosSteg.inntektbolk}>
				<NavYtelser fakta={fakta}/>
				<Bostotte />
				<HusbankInfopanel fakta={fakta}/>
				<Eiendeler fakta={fakta} />
				<Bankinnskudd fakta={fakta} dispatch={this.props.dispatch}/>
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
