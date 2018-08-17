import * as React from "react";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import Informasjonspanel, {
	NavFarger,
	InformasjonspanelIkon
} from "../../../nav-soknad/components/informasjonspanel";
import { finnFaktum } from "../../../nav-soknad/utils";
import { FormattedHTMLMessage, InjectedIntlProps, injectIntl } from "react-intl";

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
				farge={NavFarger.ADVARSEL}
			>
				<FormattedHTMLMessage id="informasjon.husbanken.bostotte"/>
			</Informasjonspanel>
		);
	}
}

export default injectIntl(HusbankInfopanel);
