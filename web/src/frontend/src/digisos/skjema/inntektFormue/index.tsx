import * as React from "react";
import { connect } from "react-redux";

import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";

import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import Bostotte from "./Bostotte";
import Eiendeler from "./Eiendeler";
import Bankinnskudd from "./Bankinnskudd";
import Utbetaling from "./Utbetaling";
import { State } from "../../redux/reducers";
import Informasjonspanel from "../../../nav-soknad/components/informasjonspanel";

class InntektFormue extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		return (
			<DigisosSkjemaSteg steg={DigisosSteg.inntektbolk}>
				<Bostotte />
				<Informasjonspanel>
					Bostøtte fra Husbanken er en statlig støtteordning for de som har lave
					inntekter og høye boutgifter. Bostøtte skal bidra til å betale boutgifter.
					Du har svart at du ikke har søkt eller mottar bostøtte fra Husbanken,
					vi anbefaler deg derfor å sjekke ut om du kan få bostøtte. https://husbanken.no/bostotte
				</Informasjonspanel>
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
