import * as React from "react";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { InformasjonspanelIkon } from "../../../nav-soknad/components/informasjonspanel";
import { finnFaktum } from "../../../nav-soknad/utils";
import { FormattedHTMLMessage, InjectedIntlProps, injectIntl } from "react-intl";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";
import InformasjonspanelFadeCollapse from "../../../nav-soknad/components/informasjonspanelFadeCollapse";

class HusbankInfopanelFadeCollapse extends React.Component<FaktumComponentProps & InjectedIntlProps, any> {
	render() {
		const { fakta } = this.props;
		const bostotteFaktum = finnFaktum("inntekt.bostotte", fakta);
		let mottarBostotte: string = "";
		if (bostotteFaktum && "value" in bostotteFaktum) {
			mottarBostotte = bostotteFaktum.value;
		}
		return (
			<InformasjonspanelFadeCollapse
				synlig={mottarBostotte === "false"}
				ikon={InformasjonspanelIkon.ELLA}
				farge={DigisosFarge.VIKTIG}
			>
				<FormattedHTMLMessage id="informasjon.husbanken.bostotte"/>
			</InformasjonspanelFadeCollapse>
		);
	}
}

export default injectIntl(HusbankInfopanelFadeCollapse);
