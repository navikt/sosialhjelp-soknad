import * as React from "react";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import Jobb from "./Jobb";
import { State } from "../../redux/reducers";
import { connect } from "react-redux";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { finnFakta } from "../../../nav-soknad/utils";
import { Faktum } from "../../../nav-soknad/types";
import Koffert from "../../../nav-soknad/components/svg/illustrasjoner/Koffert";
import { FormattedHTMLMessage } from "react-intl";
import Utdanning from "./utdanning/Utdanning";
import Arbeid from "./arbeid/Arbeid";

const ArbeidOgUtdanning: React.StatelessComponent<FaktumComponentProps & {}> = ({fakta}) => {
	const alleArbeidsforhold: Faktum[] = finnFakta("arbeidsforhold", fakta);
	const harArbeidsforhold = alleArbeidsforhold && alleArbeidsforhold.length > 0;
	return (
		<DigisosSkjemaSteg steg={DigisosSteg.arbeidbolk} ikon={<Koffert/>}>
			<Arbeid/>
			{!harArbeidsforhold && (
				<Jobb/>
			)}
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
