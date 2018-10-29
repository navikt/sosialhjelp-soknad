import * as React from "react";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { finnFaktum } from "../../../nav-soknad/utils";
import { FormattedHTMLMessage, InjectedIntlProps, injectIntl } from "react-intl";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";
import FadeCollapse from "../../../nav-soknad/components/fadecollapse";

class HusbankInfopanel extends React.Component<FaktumComponentProps & InjectedIntlProps, any> {
	render() {
		const { fakta } = this.props;
		const bostotteFaktum = finnFaktum("inntekt.bostotte", fakta);
		let mottarBostotte: string = "";
		if (bostotteFaktum && "value" in bostotteFaktum) {
			mottarBostotte = bostotteFaktum.value;
		}
		return (
			<FadeCollapse
				open={mottarBostotte === "false"}
			>
				<Informasjonspanel
					farge={DigisosFarge.NAV_ORANSJE_LIGHTEN_40}
					ikon={InformasjonspanelIkon.ELLA}
				>
					<FormattedHTMLMessage id="informasjon.husbanken.bostotte"/>
				</Informasjonspanel>
			</FadeCollapse>
		);
	}
}

export default injectIntl(HusbankInfopanel);
