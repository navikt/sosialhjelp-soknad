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
				<SporsmalFaktum faktumKey="kontakt.kontonummer">
					<InputFaktum
						faktumKey="kontakt.kontonummer"
						maxLength={11}
						required={true}
					/>
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey="kontakt.telefon">
					<InputFaktum faktumKey="kontakt.telefon" required={true} />
				</SporsmalFaktum>

				<SporsmalFaktum
					faktumKey={statsborger.faktum}
					required={true}
					renderValideringsfeil={true}>
					<RadioFaktum faktumKey={statsborger.faktum} option="true" />
					<RadioFaktum faktumKey={statsborger.faktum} option="false" />
				</SporsmalFaktum>
			</StegFaktum>
		);
	}
}

export default Kontaktinfo;
