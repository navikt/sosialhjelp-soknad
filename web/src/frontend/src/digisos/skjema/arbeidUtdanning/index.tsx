import * as React from "react";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import Jobb from "./Jobb";
import Studie from "./Studie";
import Arbeidsforhold from "./Arbeidsforhold";
import { FeatureToggles } from "../../../featureToggles";
import { State } from "../../redux/reducers";
import { connect } from "react-redux";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { finnFakta } from "../../../nav-soknad/utils";
import { Faktum } from "../../../nav-soknad/types";
import Koffert from "../../../nav-soknad/components/svg/illustrasjoner/Koffert";
import { FormattedHTMLMessage } from "react-intl";

interface StateProps {
	visArbeidsforhold: boolean;
}

const ArbeidOgUtdanning: React.StatelessComponent<FaktumComponentProps & StateProps> = ({fakta, visArbeidsforhold}) => {
	const alleArbeidsforhold: Faktum[] = finnFakta("arbeidsforhold", fakta);
	let visErDuIJobb: boolean = !alleArbeidsforhold || alleArbeidsforhold.length === 0;
	visErDuIJobb = visArbeidsforhold! ? true : visErDuIJobb;
	return (
		<DigisosSkjemaSteg steg={DigisosSteg.arbeidbolk} ikon={<Koffert/>}>
			<Arbeidsforhold/>
			{!visErDuIJobb && (
				<Jobb/>
			)}
			<h2 className="overskrift">
				<FormattedHTMLMessage id="arbeid.dinsituasjon.studerer.undertittel"/>
			</h2>
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
