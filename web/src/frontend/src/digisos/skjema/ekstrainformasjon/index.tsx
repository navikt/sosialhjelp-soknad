import * as React from "react";
import { connect } from "react-redux";
import {
	FaktumStoreState,
	FaktumComponentProps
} from "../../../nav-skjema/redux/reducer";
import Steg from "../../../nav-skjema/components/steg";
import Infoblokk from "../../../nav-skjema/components/infoblokk";
import { injectIntl, InjectedIntlProps } from "react-intl";
import "./ekstrainfo.css";

import ArbeidOgUtdanning from "./ArbeidOgUtdanning";
import Familiesituasjon from "./Familiesituasjon";
import UtgifterOgGjeld from "./UtgifterOgGjeld";

class Ekstrainformasjon extends React.Component<
	InjectedIntlProps & FaktumComponentProps,
	{}
> {
	render() {
		const { intl, fakta } = this.props;
		return (
			<div className="steg-ekstrainformasjon">
				<div className="skjema-content">
					<div className="ekstrainfo-melding">
						<Infoblokk>
							{intl.formatHTMLMessage({ id: "ekstrainfo.informasjon" })}
						</Infoblokk>
					</div>
				</div>
				<Steg tittelId="opplysningerbolk.tittel">
					<ArbeidOgUtdanning fakta={fakta} />
					<Familiesituasjon fakta={fakta} />
					<UtgifterOgGjeld fakta={fakta} />
				</Steg>
			</div>
		);
	}
}

export default connect((state: FaktumStoreState) => {
	return {
		fakta: state.faktumStore.fakta
	};
})(injectIntl(Ekstrainformasjon));
