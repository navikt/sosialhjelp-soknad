import * as React from "react";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../../nav-soknad/components/informasjonspanel";
import { DigisosFarge } from "../../../../nav-soknad/components/svg/DigisosFarger";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import {NavEnhet, SoknadsMottakerStatus} from "./AdresseTypes";
import { soknadsmottakerStatus } from "./AdresseUtils";

type Props = SoknadsdataContainerProps;

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
		if (this.props.skjul === true) {
			erSynlig = false;
		}

		return (
			<Informasjonspanel
				ikon={InformasjonspanelIkon.BREVKONVOLUTT}
				farge={farge}
				synlig={erSynlig}
			>
				{tekst}
			</Informasjonspanel>
		);
	}
}

export default connectSoknadsdataContainer(SoknadsmottakerInfo);
