import * as React from "react";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../../nav-soknad/components/informasjonspanel";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { DigisosFarge } from "../../../../nav-soknad/components/svg/DigisosFarger";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { NavEnhet } from "./AdresseTypes";
import { SoknadsMottakerStatus } from "../tps/oppholdsadresseReducer";
import { soknadsmottakerStatus } from "./AdresseUtils";
import { REST_STATUS } from "../../../../nav-soknad/types";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class SoknadsmottakerInfo extends React.Component<Props, {}> {

	render() {
		const { soknadsdata } = this.props;
		const navEnheter = soknadsdata.personalia.navEnheter;
		const valgtNavEnhet = navEnheter.find((navEnhet: NavEnhet) => navEnhet.valgt);
		let enhetsnavn = "";
		let kommunenavn = "";
		if (valgtNavEnhet) {
			enhetsnavn = valgtNavEnhet.enhetsnavn;
			kommunenavn = valgtNavEnhet.kommunenavn;
		}
		let erSynlig: boolean = true;
		let farge: DigisosFarge = DigisosFarge.SUKSESS;
		let tekst: string = "";
		const mottakerStatus = soknadsmottakerStatus(soknadsdata);
		if (mottakerStatus === SoknadsMottakerStatus.GYLDIG) {
			tekst = `Søknaden vil bli sendt til: ${enhetsnavn}, ${kommunenavn} kommune.`;
		} else if (mottakerStatus === SoknadsMottakerStatus.UGYLDIG) {
			farge = DigisosFarge.FEIL;
			tekst = "Søknaden er ikke tilgjengelig digitalt i din kommune. Ta kontakt direkte med ditt NAV-kontor.";
		} else if (mottakerStatus === SoknadsMottakerStatus.MANGLER_NAV_KONTOR) {
			farge = DigisosFarge.FEIL;
			tekst = "Kan ikke finne NAV-kontor for angitt adresse. Rett eventuelle feil i adressen eller ta direkte kontakt med ditt lokale NAV-kontor.";
		} else if (erSynlig === true) {
			erSynlig = false;
		}
		if (soknadsdata.restStatus.personalia.adresseNavEnheter === REST_STATUS.PENDING) {
			erSynlig = false;
		}

		return (
			<span>
				{erSynlig && (<Informasjonspanel
					ikon={InformasjonspanelIkon.BREVKONVOLUTT}
					farge={farge}
					synlig={erSynlig}
				>
					{tekst}
				</Informasjonspanel>)}
			</span>
		);
	}
}

export default connectSoknadsdataContainer(injectIntl(SoknadsmottakerInfo));
