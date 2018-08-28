import * as React from "react";
import { SoknadsMottakerStatus } from "./oppholdsadresseReducer";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../../nav-soknad/components/informasjonspanel";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Faktum } from "../../../../nav-soknad/types";
import { DigisosFarge } from "../../../../nav-soknad/components/svg/DigisosFarger";

interface SoknadsmottakerInfoOwnProps {
	soknadsmottakerStatus: string;
	soknadsmottakerFaktum: Faktum;
}

type SoknadsmottakerInfoProps = InjectedIntlProps & SoknadsmottakerInfoOwnProps;

const SoknadsmottakerInfoPanel: React.StatelessComponent<SoknadsmottakerInfoProps> = ({
	soknadsmottakerStatus,
	soknadsmottakerFaktum
}) => {
	let farge: DigisosFarge = DigisosFarge.NAV_GRONN_LIGHTEN_60;
	let tekst: any = "";
	const KOMMUNENAVN = "kommunenavn";
	const ENHETSNAVN = "enhetsnavn";
	const faktum = soknadsmottakerFaktum;

	if (soknadsmottakerStatus === SoknadsMottakerStatus.GYLDIG) {
		tekst = "Søknaden vil bli sendt til: "
			+ faktum.properties[ENHETSNAVN]
			+ ", "
			+ faktum.properties[KOMMUNENAVN]
			+ " Kommune.";
		return (
			<Informasjonspanel
				ikon={InformasjonspanelIkon.BREVKONVOLUTT}
				farge={farge}
			>
				{tekst}
			</Informasjonspanel>
		);
	} else if (soknadsmottakerStatus === SoknadsMottakerStatus.UGYLDIG) {

		farge = DigisosFarge.RED_ERROR;
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
		
				farge = DigisosFarge.RED_ERROR;
				tekst = "Kan ikke finne NAV-kontor for angitt adresse. Rett eventuelle feil i adressen eller ta direkte kontakt med ditt lokale NAV-kontor hvis du mener adressen likevel er riktig.";
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
