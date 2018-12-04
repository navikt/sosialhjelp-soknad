import * as React from "react";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../nav-soknad/components/informasjonspanel";
import { finnFaktum } from "../../../nav-soknad/utils";
import { FormattedHTMLMessage, InjectedIntlProps, injectIntl } from "react-intl";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";

class HusbankInfopanel extends React.Component<FaktumComponentProps & InjectedIntlProps, any> {
	render() {
		const { fakta } = this.props;
		const bostotteFaktum = finnFaktum("inntekt.bostotte", fakta);
		let mottarBostotte: string = "";
		if (bostotteFaktum && "value" in bostotteFaktum) {
			mottarBostotte = bostotteFaktum.value;
		}
		return (
			<Informasjonspanel
				synlig={mottarBostotte === "false"}
				ikon={InformasjonspanelIkon.ELLA}
				farge={DigisosFarge.VIKTIG}
			>
				<FormattedHTMLMessage id="informasjon.husbanken.bostotte"/>
			</Informasjonspanel>
		);
	}
}

export default injectIntl(HusbankInfopanel);
