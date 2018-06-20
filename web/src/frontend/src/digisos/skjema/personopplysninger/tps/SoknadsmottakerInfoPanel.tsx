import * as React from "react";
import { SoknadsMottakerStatus } from "./oppholdsadresseReducer";
import Informasjonspanel from "../../../../nav-soknad/components/informasjonspanel";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Faktum } from "../../../../nav-soknad/types";

interface SoknadsmottakerInfoOwnProps {
	soknadsmottakerStatus: string;
	soknadsmottakerFaktum: Faktum;
}

type SoknadsmottakerInfoProps = InjectedIntlProps & SoknadsmottakerInfoOwnProps;

const SoknadsmottakerInfoPanel: React.StatelessComponent<SoknadsmottakerInfoProps> = ({
	soknadsmottakerStatus,
	soknadsmottakerFaktum
}) => {
	let style: any = null;
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
				icon={<img src="/soknadsosialhjelp/statisk/bilder/konvolutt.svg"/>}
				style={style}
			>
				{tekst}
			</Informasjonspanel>
		);
	} else if (soknadsmottakerStatus === SoknadsMottakerStatus.UGYLDIG) {

		style = "feil";
		tekst = "Søknaden er ikke tilgjengelig digitalt i din kommune. Ta kontakt direkte med ditt NAV kontor.";
		// TODO: Legg til link senere.
		return (
			<Informasjonspanel
				icon={<img src="/soknadsosialhjelp/statisk/bilder/konvolutt.svg"/>}
				style={style}
			>
				{tekst}
			</Informasjonspanel>
		);
	}
	return null;
};

export default injectIntl(SoknadsmottakerInfoPanel);
