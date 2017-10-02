import * as React from "react";
import { connect } from "react-redux";
import { FormattedHTMLMessage } from "react-intl";

import { State } from "../../redux/reducers";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import Infoblokk from "../../../nav-soknad/components/infoblokk";

import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import ArbeidOgUtdanning from "./ArbeidOgUtdanning";
import Familiesituasjon from "./Familiesituasjon";
import UtgifterOgGjeld from "./UtgifterOgGjeld";

import "./ekstrainfo.css";

class Ekstrainformasjon extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		return (
			<div className="steg-ekstrainformasjon">
				<div className="skjema-content">
					<div className="ekstrainfo-melding">
						<Infoblokk>
							<FormattedHTMLMessage id="ekstrainfo.informasjon" />
						</Infoblokk>
					</div>
				</div>
				<DigisosSkjemaSteg steg={DigisosSteg.ekstrainfo}>
					<ArbeidOgUtdanning fakta={fakta} />
					<Familiesituasjon fakta={fakta} />
					<UtgifterOgGjeld fakta={fakta} />
				</DigisosSkjemaSteg>
			</div>
		);
	}
}

export default connect((state: State) => {
	return {
		fakta: state.fakta.data
	};
})(Ekstrainformasjon);
