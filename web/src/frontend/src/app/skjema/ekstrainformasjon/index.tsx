import * as React from "react";
import Steg from "../../../skjema/components/steg";
import Infoblokk from "../../../skjema/components/infoblokk";
import { injectIntl, InjectedIntlProps } from "react-intl";

class Ekstrainformasjon extends React.Component<InjectedIntlProps, {}> {
	render() {
		const { intl } = this.props;
		return (
			<div>
				<div className="skjema-content ekstrainfo-melding">
					<Infoblokk>
						{intl.formatHTMLMessage({ id: "ekstrainfo.informasjon" })}
					</Infoblokk>
				</div>
				<Steg tittelId="Opplysninger..." />
			</div>
		);
	}
}

export default injectIntl(Ekstrainformasjon);
