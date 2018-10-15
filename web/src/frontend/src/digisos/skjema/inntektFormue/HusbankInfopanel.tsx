import * as React from "react";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { finnFaktum } from "../../../nav-soknad/utils";
import { InjectedIntlProps, injectIntl } from "react-intl";
import InfoPanel from "../../../nav-soknad/components/infopanel";
import InformasjonspanelTo, {InformasjonspanelIkon} from "../../../nav-soknad/components/informasjonspanelTo";
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

			<InfoPanel
				open={mottarBostotte === "false"}
			>
				<InformasjonspanelTo
					farge={DigisosFarge.NAV_ORANSJE_LIGHTEN_40}
					ikon={InformasjonspanelIkon.ELLA}
				>
					<span>Content ...</span>
				</InformasjonspanelTo>
			</InfoPanel>


		);
	}
}

export default injectIntl(HusbankInfopanel);
