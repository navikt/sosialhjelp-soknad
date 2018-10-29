import * as React from "react";
import { SoknadsMottakerStatus } from "./oppholdsadresseReducer";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Faktum } from "../../../../nav-soknad/types";
import { DigisosFarge } from "../../../../nav-soknad/components/svg/DigisosFarger";
import InformasjonspanelEkspanderbart, {InformasjonspanelIkon} from "../../../../nav-soknad/components/informasjonspanelEkspanderbart";

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
			<InformasjonspanelEkspanderbart
				ikon={InformasjonspanelIkon.BREVKONVOLUTT}
				farge={farge}
			>
				{tekst}
			</InformasjonspanelEkspanderbart>
		);
	} else if (soknadsmottakerStatus === SoknadsMottakerStatus.UGYLDIG) {

		farge = DigisosFarge.RED_ERROR;
		tekst = "Søknaden er ikke tilgjengelig digitalt i din kommune. Ta kontakt direkte med ditt NAV-kontor.";
		// TODO: Legg til link senere.
		return (
			<InformasjonspanelEkspanderbart
				ikon={InformasjonspanelIkon.BREVKONVOLUTT}
				farge={farge}
			>
				{tekst}
			</InformasjonspanelEkspanderbart>
		);
	}  else if (soknadsmottakerStatus === SoknadsMottakerStatus.MANGLER_NAV_KONTOR) {
		
				farge = DigisosFarge.RED_ERROR;
				tekst = "Kan ikke finne NAV-kontor for angitt adresse. Rett eventuelle feil i adressen eller ta direkte kontakt med ditt lokale NAV-kontor.";
				return (
					<InformasjonspanelEkspanderbart
						ikon={InformasjonspanelIkon.BREVKONVOLUTT}
						farge={farge}
					>
						{tekst}
					</InformasjonspanelEkspanderbart>
				);
			}
	return null;
};

export default injectIntl(SoknadsmottakerInfoPanel);
