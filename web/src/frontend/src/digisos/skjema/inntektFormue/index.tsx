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
import Penger from "../../../nav-soknad/components/svg/illustrasjoner/Penger";
import { FormattedHTMLMessage } from "react-intl";

class InntektFormue extends React.Component<FaktumComponentProps & DispatchProps, any> {
	render() {
		const { fakta } = this.props;
		return (
			<DigisosSkjemaSteg steg={DigisosSteg.inntektbolk} ikon={<Penger/>}>
				<h2 className="skjema-sporsmal skjema-sporsmal--systeminfo luftOverForsteUndertittel">
					<FormattedHTMLMessage id="opplysninger.inntekt.undertittel"/>
				</h2>
				<NavYtelser fakta={fakta}/>
				<Bostotte />
				<HusbankInfopanel fakta={fakta}/>
				<Utbetaling fakta={fakta} />
				<h2 className="skjema-sporsmal skjema-sporsmal--systeminfo">
					<FormattedHTMLMessage id="opplysninger.formue.undertittel"/>
				</h2>
				<Bankinnskudd fakta={fakta} dispatch={this.props.dispatch}/>
				<Eiendeler fakta={fakta} />
			</DigisosSkjemaSteg>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data
	};
})(InntektFormue);
