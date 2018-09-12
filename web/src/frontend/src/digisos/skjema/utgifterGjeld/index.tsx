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
			<DigisosSkjemaSteg steg={DigisosSteg.utgifterbolk}>
				<JaNeiSporsmalFaktum faktumKey={harBoutgifter.faktum}>
					<SporsmalFaktum faktumKey={boUtgifter.faktum}>
						<CheckboxFaktum
							id="boutgifter_husleie_checkbox"
							faktumKey={createCheckboxFaktumKey(boUtgifter.faktum, "husleie")}
							visPanel={true}
							className="fullBreddeRadioPanel"
						/>
						<CheckboxFaktum
							id="boutgifter_strom_checkbox"
							faktumKey={createCheckboxFaktumKey(boUtgifter.faktum, "strom")}
							visPanel={true}
							className="fullBreddeRadioPanel"
						/>
						<CheckboxFaktum
							id="boutgifter_kommunale_avgifter_checkbox"
							faktumKey={createCheckboxFaktumKey(
								boUtgifter.faktum,
								"kommunaleavgifter"
							)}
							visPanel={true}
							className="fullBreddeRadioPanel"
						/>
						<CheckboxFaktum
							id="boutgifter_oppvarming_checkbox"
							faktumKey={createCheckboxFaktumKey(
								boUtgifter.faktum,
								"oppvarming"
							)}
							visPanel={true}
							className="fullBreddeRadioPanel"
						/>
						<CheckboxFaktum
							id="boutgifter_avdrag_renter_checkbox"
							faktumKey={createCheckboxFaktumKey(
								boUtgifter.faktum,
								"avdraglaan"
							)}
							visPanel={true}
							className="fullBreddeRadioPanel"
						/>
						<CheckboxFaktum
							id="boutgifter_andre_utgifter_checkbox"
							faktumKey={createCheckboxFaktumKey(
								boUtgifter.faktum,
								"andreutgifter"
							)}
							visPanel={true}
							className="fullBreddeRadioPanel"
						/>
					</SporsmalFaktum>
				</JaNeiSporsmalFaktum>
				<JaNeiSporsmalFaktum
					faktumKey={harUtgifterBarn.faktum}
					visible={getFaktumVerdi(fakta, "familie.barn") !== "false"}
				>
					<SporsmalFaktum faktumKey={barneUtgifter.faktum}>
						<CheckboxFaktum
							id="utgifter_barn_fritidsaktivitet_checkbox"
							faktumKey={createCheckboxFaktumKey(
								barneUtgifter.faktum,
								"fritidsaktivitet"
							)}
							visPanel={true}
							className="fullBreddeRadioPanel"
						/>
						<CheckboxFaktum
							id="utgifter_barn_barnehage_checkbox"
							faktumKey={createCheckboxFaktumKey(
								barneUtgifter.faktum,
								"barnehage"
							)}
							visPanel={true}
							className="fullBreddeRadioPanel"
						/>
						<CheckboxFaktum
							id="utgifter_barn_sfo_checkbox"
							faktumKey={createCheckboxFaktumKey(barneUtgifter.faktum, "sfo")}
							visPanel={true}
							className="fullBreddeRadioPanel"
						/>
						<CheckboxFaktum
							id="utgifter_barn_tannbehandling_checkbox"
							faktumKey={createCheckboxFaktumKey(
								barneUtgifter.faktum,
								"tannbehandling"
							)}
							visPanel={true}
							className="fullBreddeRadioPanel"
						/>
						<CheckboxFaktum
							id="utgifter_barn_annet_checkbox"
							faktumKey={createCheckboxFaktumKey(barneUtgifter.faktum, "annet")}
							visPanel={true}
							className="fullBreddeRadioPanel"
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
