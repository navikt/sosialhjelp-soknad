import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import StegFaktum from "../../../nav-soknad/faktum/StegFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import InputFaktum from "../../../nav-soknad/faktum/InputFaktum";
import { radioCheckKeys } from "../../../nav-soknad/utils";

class Kontaktinfo extends React.Component<{}, {}> {
	render() {
		const statsborger = radioCheckKeys("kontakt.statsborger");
		return (
			<StegFaktum tittelId="kontakt.tittel">
				<SporsmalFaktum faktumId="kontakt.kontonummer">
					<InputFaktum faktumKey="kontakt.kontonummer" maxLength={11} />
				</SporsmalFaktum>
				<SporsmalFaktum faktumId="kontakt.telefon">
					<InputFaktum faktumKey="kontakt.telefon" />
				</SporsmalFaktum>

				<SporsmalFaktum faktumId={statsborger.faktum}>
					<RadioFaktum faktumKey={statsborger.faktum} option="true" />
					<RadioFaktum faktumKey={statsborger.faktum} option="false" />
					<RadioFaktum faktumKey={statsborger.faktum} option="ikkeoppgi" />
				</SporsmalFaktum>
			</StegFaktum>
		);
	}
}

export default Kontaktinfo;
