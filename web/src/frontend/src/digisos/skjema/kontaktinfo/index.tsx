import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import StegFaktum from "../../../nav-soknad/faktum/StegFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import TelefonFaktum from "../../../nav-soknad/faktum/typedInput/TelefonFaktum";
import KontonummerFaktum from "../../../nav-soknad/faktum/typedInput/KontonummerFaktum";
import { radioCheckKeys } from "../../../nav-soknad/utils";

class Kontaktinfo extends React.Component<{}, {}> {
	render() {
		const statsborger = radioCheckKeys("kontakt.statsborger");
		return (
			<StegFaktum tittelId="kontakt.tittel">
				<SporsmalFaktum faktumKey="kontakt.kontonummer">
					<KontonummerFaktum required={true} faktumKey="kontakt.kontonummer" />
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey="kontakt.telefon">
					<TelefonFaktum required={true} faktumKey="kontakt.telefon" />
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey={statsborger.faktum} required={true}>
					<RadioFaktum faktumKey={statsborger.faktum} value="true" />
					<RadioFaktum faktumKey={statsborger.faktum} value="false" />
				</SporsmalFaktum>
			</StegFaktum>
		);
	}
}

export default Kontaktinfo;
