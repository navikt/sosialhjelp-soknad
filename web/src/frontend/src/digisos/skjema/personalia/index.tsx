import * as React from "react";
import { connect } from "react-redux";

import { State } from "../../redux/reducers";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import CheckboxFaktum from "../../../nav-soknad/faktum/CheckboxFaktum";
import TelefonFaktum from "../../../nav-soknad/faktum/typedInput/TelefonFaktum";
import KontonummerFaktum from "../../../nav-soknad/faktum/typedInput/KontonummerFaktum";
import {
	radioCheckKeys,
	faktumIsSelected,
	getFaktumVerdi
} from "../../../nav-soknad/utils";

import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";

class Kontaktinfo extends React.Component<FaktumComponentProps, {}> {
	render() {
		const statsborger = radioCheckKeys("kontakt.statsborger");
		const brukerHarIkkeKontonummer = faktumIsSelected(
			getFaktumVerdi(this.props.fakta, "kontakt.kontonummer.harikke")
		);
		return (
			<DigisosSkjemaSteg steg={DigisosSteg.personalia}>
				<SporsmalFaktum faktumKey="kontakt.kontonummer">
					<KontonummerFaktum
						faktumKey="kontakt.kontonummer"
						disabled={brukerHarIkkeKontonummer}
					/>
					<CheckboxFaktum faktumKey="kontakt.kontonummer.harikke" />
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey="kontakt.telefon">
					<TelefonFaktum faktumKey="kontakt.telefon" />
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey={statsborger.faktum}>
					<RadioFaktum faktumKey={statsborger.faktum} value="true" />
					<RadioFaktum faktumKey={statsborger.faktum} value="false" />
				</SporsmalFaktum>
			</DigisosSkjemaSteg>
		);
	}
}

export default connect((state: State) => {
	return {
		fakta: state.fakta.data
	};
})(Kontaktinfo);
