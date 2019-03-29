import * as React from "react";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../../nav-soknad/components/informasjonspanel";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { DigisosFarge } from "../../../../nav-soknad/components/svg/DigisosFarger";
import { SoknadsMottakerStatus } from "../tps/oppholdsadresseReducer";

interface SoknadsmottakerInfoOwnProps {
	soknadsmottakerStatus: string;
	enhetsnavn?: string;
	kommunenavn?: string;
}

type SoknadsmottakerInfoProps = InjectedIntlProps & SoknadsmottakerInfoOwnProps;

const SoknadsmottakerInfo: React.FunctionComponent<SoknadsmottakerInfoProps> = ({
	soknadsmottakerStatus,
	enhetsnavn,
	kommunenavn
}) => {
	let farge: DigisosFarge = DigisosFarge.SUKSESS;
	let tekst: any = "";

	if (soknadsmottakerStatus === SoknadsMottakerStatus.GYLDIG) {
		tekst = "Søknaden vil bli sendt til: "
			+ enhetsnavn
			+ ", "
			+ kommunenavn
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

export default injectIntl(SoknadsmottakerInfo);

