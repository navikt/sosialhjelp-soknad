import { FormattedHTMLMessage, FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import * as React from "react";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../nav-soknad/components/informasjonspanel";
import { DigisosFarge } from "../../../nav-soknad/components/svg/DigisosFarger";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";

type Props = InjectedIntlProps & SoknadsdataContainerProps;

class SoknadsmottakerInfoPanel  extends React.Component<Props, {}> {

	render() {
		const { valgtSoknadsmottaker } = this.props.soknad;

		if (valgtSoknadsmottaker){
			const valgtEnhetsNavn = `${valgtSoknadsmottaker.enhetsnavn}, ${valgtSoknadsmottaker.kommunenavn} kommune`;
			return (
				<Informasjonspanel
					farge={DigisosFarge.VIKTIG}
					ikon={InformasjonspanelIkon.BREVKONVOLUTT}
				>
					<FormattedHTMLMessage id="soknasosialhjelp.oppsummering.hvorsendes" values={{navkontor: valgtEnhetsNavn}}/>
					<br/><br/>
					<a
						className="lenke"
						onClick={() => {
							this.props.setVisSamtykkeInfo(true);
						}}
					>
						<FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.lenke"/>
					</a>
				</Informasjonspanel>
			);
		} else {
			return null;
		}

	}

}

export default connectSoknadsdataContainer(injectIntl(SoknadsmottakerInfoPanel));
