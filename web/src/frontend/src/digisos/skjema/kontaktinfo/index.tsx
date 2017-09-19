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
						validerFunc={[pakrevd, erKontonummer]}
					/>
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey="kontakt.telefon">
					<InputFaktum
						faktumKey="kontakt.telefon"
						validerFunc={[pakrevd, erTelefonnummer]}
					/>
				</SporsmalFaktum>

				<SporsmalFaktum
					faktumKey={statsborger.faktum}
					renderValideringsfeil={true}
					validerFunc={[pakrevd]}>
					<RadioFaktum faktumKey={statsborger.faktum} value="true" />
					<RadioFaktum faktumKey={statsborger.faktum} value="false" />
				</SporsmalFaktum>
			</StegFaktum>
		);
	}
}

export default Kontaktinfo;
