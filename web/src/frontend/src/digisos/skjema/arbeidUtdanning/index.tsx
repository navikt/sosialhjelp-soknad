import * as React from "react";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import Jobb from "./Jobb";
import Studie from "./Studie";
import Arbeidsforhold from "./Arbeidsforhold";
import {FeatureToggles} from "../../../featureToggles";
import {State} from "../../redux/reducers";
import {connect} from "react-redux";
import {FaktumComponentProps} from "../../../nav-soknad/redux/fakta/faktaTypes";
import {finnFakta} from "../../../nav-soknad/utils";
import {Faktum} from "../../../nav-soknad/types";
import {FormattedMessage} from "react-intl";

interface StateProps {
	visArbeidsforhold: boolean;
}

const ArbeidOgUtdanning: React.StatelessComponent<FaktumComponentProps & StateProps> = ({fakta, visArbeidsforhold}) => {
	const alleArbeidsforhold: Faktum[] = finnFakta("arbeidsforhold", fakta);
	let visErDuIJobb: boolean = !alleArbeidsforhold || alleArbeidsforhold.length === 0;
	visErDuIJobb = visArbeidsforhold! ? true : visErDuIJobb;
	console.warn("visErDuIJobb: " + visErDuIJobb);
	return (
		<DigisosSkjemaSteg steg={DigisosSteg.arbeidbolk}>
			<Arbeidsforhold/>
			// Hvis det ikke funnet noe data i AA-registeret skal skjema for utfylling av arbeidsforhold vises
			{!visErDuIJobb && (
				<Jobb/>
			)}
			<Studie/>
		</DigisosSkjemaSteg>
	);
};

export default connect((state: State, {}) => {
	return {
		fakta: state.fakta.data,
		visArbeidsforhold:
		state.featuretoggles.data[FeatureToggles.arbeidsforhold] === "true",
	};
})(ArbeidOgUtdanning);
