import * as React from "react";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import Informasjonspanel from "../../../nav-soknad/components/informasjonspanel";
import { finnFaktum } from "../../../nav-soknad/utils";
import { FormattedHTMLMessage, InjectedIntlProps, injectIntl } from "react-intl";

class HusbankInfopanel extends React.Component<FaktumComponentProps & InjectedIntlProps, any> {
	render() {
		const { fakta } = this.props;
		const bostotteFaktum = finnFaktum("inntekt.bostotte", fakta);
		const mottarBostotte = bostotteFaktum.value;
		if (mottarBostotte === "false") {
			return (
				<Informasjonspanel>
					<FormattedHTMLMessage id="informasjon.husbanken.bostotte"/>
				</Informasjonspanel>
			);
		} else {
			return <span/>;
		}
	}
}

export default injectIntl(HusbankInfopanel);
