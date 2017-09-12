import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import StegFaktum from "../../../nav-soknad/faktum/StegFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import InputFaktum from "../../../nav-soknad/faktum/InputFaktum";
import { radioCheckKeys } from "../../../nav-soknad/utils";
import {
	pakrevd,
	erKontonummer,
	erTelefonnummer
} from "../../../nav-soknad/validering/valideringer";

class Kontaktinfo extends React.Component<{}, {}> {
	render() {
		const statsborger = radioCheckKeys("kontakt.statsborger");
		return (
			<StegFaktum tittelId="kontakt.tittel">
				<SporsmalFaktum faktumKey="kontakt.kontonummer">
					<InputFaktum
						faktumKey="kontakt.kontonummer"
						maxLength={11}
						valideringer={[
							{
								feilmelding: "Kontonummer må fylles ut",
								validerFunc: pakrevd
							},
							{
								feilmelding: "Kontonummer er ugyldig",
								validerFunc: erKontonummer
							}
						]}
					/>
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey="kontakt.telefon">
					<InputFaktum
						faktumKey="kontakt.telefon"
						valideringer={[
							{
								feilmelding: "Telefonnummeret er ugyldig",
								validerFunc: erTelefonnummer
							}
						]}
					/>
				</SporsmalFaktum>

				<SporsmalFaktum
					faktumKey={statsborger.faktum}
					renderValideringsfeil={true}
					valideringer={[
						{
							validerFunc: pakrevd,
							feilmelding: "Må fylles ut"
						}
					]}>
					<RadioFaktum faktumKey={statsborger.faktum} option="true" />
					<RadioFaktum faktumKey={statsborger.faktum} option="false" />
				</SporsmalFaktum>
			</StegFaktum>
		);
	}
}

export default Kontaktinfo;
