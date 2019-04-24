import * as React from "react";
import {SoknadsMottakerStatus} from "./oppholdsadresseReducer";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../../nav-soknad/components/informasjonspanel";
import {InjectedIntlProps, injectIntl} from "react-intl";
import {Faktum} from "../../../../nav-soknad/types";
import {DigisosFarge} from "../../../../nav-soknad/components/svg/DigisosFarger";

interface SoknadsmottakerInfoOwnProps {
	soknadsmottakerStatus: string;
	soknadsmottakerFaktum: Faktum;
}

type SoknadsmottakerInfoProps = InjectedIntlProps & SoknadsmottakerInfoOwnProps;

const SoknadsmottakerInfoPanel: React.StatelessComponent<SoknadsmottakerInfoProps> = ({
	soknadsmottakerStatus,
	soknadsmottakerFaktum
}) => {
	let farge: DigisosFarge = DigisosFarge.SUKSESS;
	let tekst: any = "";
	const KOMMUNENAVN = "kommunenavn";
	const ENHETSNAVN = "enhetsnavn";
	const faktum = soknadsmottakerFaktum;

	if (soknadsmottakerStatus === SoknadsMottakerStatus.GYLDIG) {
		tekst = "Søknaden vil bli sendt til: "
			+ faktum.properties[ENHETSNAVN]
			+ ", "
			+ faktum.properties[KOMMUNENAVN]
			+ " kommune.";
		return (
			<Informasjonspanel
				ikon={InformasjonspanelIkon.BREVKONVOLUTT}
				farge={farge}
			>
				{tekst}
			</Informasjonspanel>
		);
	} else if (soknadsmottakerStatus === SoknadsMottakerStatus.UGYLDIG) {

		farge = DigisosFarge.FEIL;
		tekst = "Søknaden er ikke tilgjengelig digitalt i din kommune. Ta kontakt direkte med ditt NAV-kontor.";
		// TODO: Legg til link senere.
		return (
			<Informasjonspanel
				ikon={InformasjonspanelIkon.BREVKONVOLUTT}
				farge={farge}
			>
				{tekst}
			</Informasjonspanel>
		);
	}  else if (soknadsmottakerStatus === SoknadsMottakerStatus.MANGLER_NAV_KONTOR) {
		
				farge = DigisosFarge.FEIL;
				tekst = "Kan ikke finne NAV-kontor for angitt adresse. Rett eventuelle feil i adressen eller ta direkte kontakt med ditt lokale NAV-kontor.";
				return (
					<Informasjonspanel
						ikon={InformasjonspanelIkon.BREVKONVOLUTT}
						farge={farge}
					>
						{tekst}
					</Informasjonspanel>
				);
			}
	return null;
};

export default injectIntl(SoknadsmottakerInfoPanel);
