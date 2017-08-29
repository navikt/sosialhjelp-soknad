import * as React from "react";
import { connect } from "react-redux";
import {
	FaktumStoreState,
	FaktumComponentProps
} from "../../../skjema/reducer";
import Steg from "../../../skjema/components/steg";
import Infoblokk from "../../../skjema/components/infoblokk";
import { injectIntl, InjectedIntlProps } from "react-intl";

import ArbeidOgUtdanning from "./ArbeidOgUtdanning";

class Ekstrainformasjon extends React.Component<
	InjectedIntlProps & FaktumComponentProps,
	{}
> {
	render() {
		const { intl, fakta } = this.props;
		return (
			<div>
				<div className="skjema-content ekstrainfo-melding">
					<Infoblokk>
						{intl.formatHTMLMessage({ id: "ekstrainfo.informasjon" })}
					</Infoblokk>
				</div>
				<Steg tittelId="Opplysninger...">
					<ArbeidOgUtdanning fakta={fakta} />
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
