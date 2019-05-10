import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { FormattedHTMLMessage, FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import * as React from "react";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../nav-soknad/components/informasjonspanel";
import { DigisosFarge } from "../../../nav-soknad/components/svg/DigisosFarger";
import { NavEnhet } from "../personopplysninger/adresse/AdresseTypes";
import { SoknadsSti } from "../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class SoknadsmottakerInfoPanel  extends React.Component<Props, {}> {

	componentDidMount() {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.ADRESSER);
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.NAV_ENHETER);
	}

	valgtEnhetsNavn(): string {
		const { soknadsdata } = this.props;
		const navEnheter = soknadsdata.personalia.navEnheter;
		const valgtNavEnhet = navEnheter.find((navEnhet: NavEnhet) => navEnhet.valgt);
		let enhetsnavn = "";
		let kommunenavn = "";
		if (valgtNavEnhet) {
			enhetsnavn = valgtNavEnhet.enhetsnavn;
			kommunenavn = valgtNavEnhet.kommunenavn;
		} else {
			return "";
		}
		return `${enhetsnavn}, ${kommunenavn} kommune`;
	}

	render() {
		const valgtEnhetsNavn = this.valgtEnhetsNavn();
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
					}}>
					<FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.lenke"/>
				</a>
			</Informasjonspanel>
		);
	}

}

export default connectSoknadsdataContainer(injectIntl(SoknadsmottakerInfoPanel));
