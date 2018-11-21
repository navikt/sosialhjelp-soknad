import * as React from "react";
import { connect } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";

import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import CheckboxFaktum, {
	createCheckboxFaktumKey
} from "../../../nav-soknad/faktum/CheckboxFaktum";
import {
	getFaktumVerdi,
	radioCheckKeys
} from "../../../nav-soknad/utils";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";

import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import { State } from "../../redux/reducers";
import KredittkortIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/KredittkortIllustrasjon";
import {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";

class UtgifterGjeld extends React.Component<
	FaktumComponentProps & DispatchProps & InjectedIntlProps,
	any
> {
	render() {
		const { fakta } = this.props;
		const harBoutgifter = radioCheckKeys("utgifter.boutgift");
		const boUtgifter = radioCheckKeys(`${harBoutgifter.faktum}.true.type`);
		const harUtgifterBarn = radioCheckKeys("utgifter.barn");
		const barneUtgifter = radioCheckKeys("utgifter.barn.true.utgifter");

		return (
			<DigisosSkjemaSteg steg={DigisosSteg.utgifterbolk} ikon={<KredittkortIllustrasjon/>}>
				<JaNeiSporsmalFaktum
					faktumKey={harBoutgifter.faktum}
					legendTittelStyle={LegendTittleStyle.FET_NORMAL}
				>
					<SporsmalFaktum faktumKey={boUtgifter.faktum}>
						<CheckboxFaktum
							id="boutgifter_husleie_checkbox"
							faktumKey={createCheckboxFaktumKey(boUtgifter.faktum, "husleie")}
							/>
						<CheckboxFaktum
							id="boutgifter_strom_checkbox"
							faktumKey={createCheckboxFaktumKey(boUtgifter.faktum, "strom")}
						/>
						<CheckboxFaktum
							id="boutgifter_kommunale_avgifter_checkbox"
							faktumKey={createCheckboxFaktumKey(
								boUtgifter.faktum,
								"kommunaleavgifter"
							)}
						/>
						<CheckboxFaktum
							id="boutgifter_oppvarming_checkbox"
							faktumKey={createCheckboxFaktumKey(
								boUtgifter.faktum,
								"oppvarming"
							)}
						/>
						<CheckboxFaktum
							id="boutgifter_avdrag_renter_checkbox"
							faktumKey={createCheckboxFaktumKey(
								boUtgifter.faktum,
								"avdraglaan"
							)}
						/>
						<CheckboxFaktum
							id="boutgifter_andre_utgifter_checkbox"
							faktumKey={createCheckboxFaktumKey(
								boUtgifter.faktum,
								"andreutgifter"
							)}
						/>
					</SporsmalFaktum>
				</JaNeiSporsmalFaktum>
				<JaNeiSporsmalFaktum
					faktumKey={harUtgifterBarn.faktum}
					visible={getFaktumVerdi(fakta, "system.familie.barn") !== "false"}
					legendTittelStyle={LegendTittleStyle.FET_NORMAL}
				>
					<SporsmalFaktum faktumKey={barneUtgifter.faktum}>
						<CheckboxFaktum
							id="utgifter_barn_fritidsaktivitet_checkbox"
							faktumKey={createCheckboxFaktumKey(
								barneUtgifter.faktum,
								"fritidsaktivitet"
							)}
						/>
						<CheckboxFaktum
							id="utgifter_barn_barnehage_checkbox"
							faktumKey={createCheckboxFaktumKey(
								barneUtgifter.faktum,
								"barnehage"
							)}
						/>
						<CheckboxFaktum
							id="utgifter_barn_sfo_checkbox"
							faktumKey={createCheckboxFaktumKey(barneUtgifter.faktum, "sfo")}
						/>
						<CheckboxFaktum
							id="utgifter_barn_tannbehandling_checkbox"
							faktumKey={createCheckboxFaktumKey(
								barneUtgifter.faktum,
								"tannbehandling"
							)}
						/>
						<CheckboxFaktum
							id="utgifter_barn_annet_checkbox"
							faktumKey={createCheckboxFaktumKey(barneUtgifter.faktum, "annet")}
						/>
					</SporsmalFaktum>
				</JaNeiSporsmalFaktum>
			</DigisosSkjemaSteg>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data
	};
})(injectIntl(UtgifterGjeld));
