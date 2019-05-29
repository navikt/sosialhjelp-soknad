import * as React from "react";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import {State} from "../../redux/reducers";
import {connect} from "react-redux";
import {FaktumComponentProps} from "../../../nav-soknad/redux/fakta/faktaTypes";
import Koffert from "../../../nav-soknad/components/svg/illustrasjoner/Koffert";
import {FormattedHTMLMessage} from "react-intl";
import Utdanning from "./utdanning/Utdanning";
import Arbeid from "./arbeid/Arbeid";

const ArbeidOgUtdanning: React.StatelessComponent<FaktumComponentProps & {}> = () => {
	return (
		<DigisosSkjemaSteg steg={DigisosSteg.arbeidbolk} ikon={<Koffert/>}>
			<Arbeid/>
			<h2 className="overskrift">
				<FormattedHTMLMessage id="arbeid.dinsituasjon.studerer.undertittel"/>
			</h2>
			<Utdanning/>
		</DigisosSkjemaSteg>
	);
};

export default connect((state: State, {}) => {
	return {
		fakta: state.fakta.data
	};
})(ArbeidOgUtdanning);
