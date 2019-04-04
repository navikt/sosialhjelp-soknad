import * as React from "react";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../../nav-soknad/components/informasjonspanel";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { DigisosFarge } from "../../../../nav-soknad/components/svg/DigisosFarger";
import { SoknadsMottakerStatus } from "../tps/oppholdsadresseReducer";

interface SoknadsmottakerInfoOwnProps {
	soknadsmottakerStatus: string;
	enhetsnavn?: string;
	kommunenavn?: string;
	synlig?: boolean;
}

type SoknadsmottakerInfoProps = InjectedIntlProps & SoknadsmottakerInfoOwnProps;

class SoknadsmottakerInfo extends React.Component<SoknadsmottakerInfoProps, {}> {

	render() {
		const {	soknadsmottakerStatus, enhetsnavn, kommunenavn, synlig } = this.props;
		let erSynlig: boolean = synlig;
		let farge: DigisosFarge = DigisosFarge.SUKSESS;
		let tekst: any = "";
		if (soknadsmottakerStatus === SoknadsMottakerStatus.GYLDIG) {
			tekst = `Søknaden vil bli sendt til: ${enhetsnavn}, ${kommunenavn} Kommune.`;
		} else if (soknadsmottakerStatus === SoknadsMottakerStatus.UGYLDIG) {
			farge = DigisosFarge.FEIL;
			tekst = "Søknaden er ikke tilgjengelig digitalt i din kommune. Ta kontakt direkte med ditt NAV-kontor.";
		} else if (soknadsmottakerStatus === SoknadsMottakerStatus.MANGLER_NAV_KONTOR) {
			farge = DigisosFarge.FEIL;
			tekst = "Kan ikke finne NAV-kontor for angitt adresse. Rett eventuelle feil i adressen eller ta direkte kontakt med ditt lokale NAV-kontor.";
		} else if (erSynlig === true) {
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
		);	}

}

export default injectIntl(SoknadsmottakerInfo);

