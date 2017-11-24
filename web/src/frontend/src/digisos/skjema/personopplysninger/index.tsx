import * as React from "react";
import { connect } from "react-redux";

import { State } from "../../redux/reducers";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import CheckboxFaktum from "../../../nav-soknad/faktum/CheckboxFaktum";
import TelefonFaktum from "../../../nav-soknad/faktum/typedInput/TelefonFaktum";
import KontonummerFaktum from "../../../nav-soknad/faktum/typedInput/KontonummerFaktum";
import { FeatureToggles } from "../../../featureToggles";
import {
	radioCheckKeys,
	faktumIsSelected,
	getFaktumVerdi,
	eksistererFaktum
} from "../../../nav-soknad/utils";
import TPS from "./tps";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";

interface StateProps {
	visPersonaliaFraTPS: boolean;
	visKontaktinfoFraTPS: boolean;
}

export type Props = StateProps & FaktumComponentProps;

class Personalia extends React.Component<Props, {}> {
	render() {
		if (this.props.visPersonaliaFraTPS) {
			return <TPS {...this.props} />;
		}

		const harKontonummer: boolean = eksistererFaktum(
			this.props.fakta,
			"kontakt.kontonummer.system"
		);
		const statsborger = radioCheckKeys("kontakt.statsborger");
		const brukerHarIkkeKontonummer = faktumIsSelected(
			getFaktumVerdi(this.props.fakta, "kontakt.kontonummer.harikke")
		);

		return (
			<DigisosSkjemaSteg steg={DigisosSteg.kontakt}>
				{!harKontonummer && (
					<SporsmalFaktum faktumKey="kontakt.kontonummer">
						<KontonummerFaktum
							faktumKey="kontakt.kontonummer"
							disabled={brukerHarIkkeKontonummer}
							ignorert={brukerHarIkkeKontonummer}
						/>
						<CheckboxFaktum faktumKey="kontakt.kontonummer.harikke" />
					</SporsmalFaktum>
				)}
				{harKontonummer && (
					<SporsmalFaktum faktumKey="kontakt.kontonummer.bruker">
						<KontonummerFaktum
							faktumKey="kontakt.kontonummer.system"
							disabled={true}
							systemverdi={true}
						/>
						<KontonummerFaktum
							faktumKey="kontakt.kontonummer.bruker"
							disabled={brukerHarIkkeKontonummer}
							ignorert={brukerHarIkkeKontonummer}
						/>
						<CheckboxFaktum faktumKey="kontakt.kontonummer.harikke" />
					</SporsmalFaktum>
				)}
				<SporsmalFaktum faktumKey="kontakt.telefon">
					<TelefonFaktum faktumKey="kontakt.telefon" maxLength={8} />
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey={statsborger.faktum}>
					<RadioFaktum faktumKey={statsborger.faktum} value="true" />
					<RadioFaktum faktumKey={statsborger.faktum} value="false" />
				</SporsmalFaktum>
				)}
			</DigisosSkjemaSteg>
		);
	}
}

export default connect((state: State): Props => {
	return {
		visPersonaliaFraTPS:
			state.featuretoggles.data[FeatureToggles.viseTpsPersonalia],
		visKontaktinfoFraTPS:
			state.featuretoggles.data[FeatureToggles.viseTpsPersonalia],
		fakta: state.fakta.data
	};
})(Personalia);
