import * as React from "react";
import { connect } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";
import {
	faktumIsSelected,
	getFaktumVerdi,
	radioCheckKeys
} from "../../../nav-soknad/utils";

import { State } from "../../redux/reducers";
import { DispatchProps } from "../../redux/types";

import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import StegFaktum from "../../../nav-soknad/faktum/StegFaktum";
import CheckboxFaktum, {
	createCheckboxFaktumKey
} from "../../../nav-soknad/faktum/CheckboxFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";
import { getMaksLengdeFunc } from "../../../nav-soknad/validering/valideringer";

class UtgifterGjeld extends React.Component<
	FaktumComponentProps & DispatchProps & InjectedIntlProps,
	any
> {
	render() {
		const { fakta } = this.props;

		const harBoutgifter = radioCheckKeys("utgifter.boutgift");
		const boUtgifter = radioCheckKeys(`${harBoutgifter.faktum}.true.type`);
		const andreBoUtgifter = `${boUtgifter.faktum}.andreutgifter.true.beskrivelse`;

		const harUtgifterBarn = radioCheckKeys("utgifter.barn");
		const barneUtgifter = radioCheckKeys("utgifter.barn.true.utgifter");
		const andreBarneutgifter = `${barneUtgifter.faktum}.annet.true.beskrivelse`;

		return (
			<StegFaktum tittelId="utgifterbolk.tittel">
				<SporsmalFaktum faktumKey={harBoutgifter.faktum} required={true}>
					<RadioFaktum faktumKey={harBoutgifter.faktum} value="true" />
					<Underskjema
						visible={getFaktumVerdi(fakta, harBoutgifter.faktum) === "true"}>
						<SporsmalFaktum faktumKey={boUtgifter.faktum}>
							{/*TODO checkboxgruppefaktum*/}
							<CheckboxFaktum
								faktumKey={createCheckboxFaktumKey(
									boUtgifter.faktum,
									"husleie"
								)}
							/>
							<CheckboxFaktum
								faktumKey={createCheckboxFaktumKey(boUtgifter.faktum, "strom")}
							/>
							<CheckboxFaktum
								faktumKey={createCheckboxFaktumKey(
									boUtgifter.faktum,
									"kommunaleavgifter"
								)}
							/>
							<CheckboxFaktum
								faktumKey={createCheckboxFaktumKey(
									boUtgifter.faktum,
									"oppvarming"
								)}
							/>
							<CheckboxFaktum
								faktumKey={createCheckboxFaktumKey(
									boUtgifter.faktum,
									"avdraglaan"
								)}
							/>
							<CheckboxFaktum
								faktumKey={createCheckboxFaktumKey(
									boUtgifter.faktum,
									"andreutgifter"
								)}
							/>

							{faktumIsSelected(
								getFaktumVerdi(fakta, `${boUtgifter.faktum}.andreutgifter`)
							) ? (
								<TextareaFaktum
									faktumKey={andreBoUtgifter}
									maxLength={400}
									validerFunc={[getMaksLengdeFunc(400)]}
								/>
							) : null}
						</SporsmalFaktum>
					</Underskjema>
					<RadioFaktum faktumKey={harBoutgifter.faktum} value="false" />
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey={harUtgifterBarn.faktum} required={true}>
					<RadioFaktum faktumKey={harUtgifterBarn.faktum} value="true" />
					<Underskjema
						visible={getFaktumVerdi(fakta, harUtgifterBarn.faktum) === "true"}>
						{/*TODO checkboxgruppefaktum*/}

						<SporsmalFaktum faktumKey={barneUtgifter.faktum}>
							<CheckboxFaktum
								faktumKey={createCheckboxFaktumKey(
									barneUtgifter.faktum,
									"fritidsaktivitet"
								)}
							/>
							<CheckboxFaktum
								faktumKey={createCheckboxFaktumKey(
									barneUtgifter.faktum,
									"barnehage"
								)}
							/>
							<CheckboxFaktum
								faktumKey={createCheckboxFaktumKey(
									barneUtgifter.faktum,
									"tannbehandling"
								)}
							/>
							<CheckboxFaktum
								faktumKey={createCheckboxFaktumKey(
									barneUtgifter.faktum,
									"helse"
								)}
							/>
							<CheckboxFaktum
								faktumKey={createCheckboxFaktumKey(
									barneUtgifter.faktum,
									"annet"
								)}
							/>
							{faktumIsSelected(
								getFaktumVerdi(fakta, `${barneUtgifter.faktum}.annet`)
							) ? (
								<TextareaFaktum
									faktumKey={andreBarneutgifter}
									maxLength={400}
									validerFunc={[getMaksLengdeFunc(400)]}
								/>
							) : null}
						</SporsmalFaktum>
					</Underskjema>
					<RadioFaktum faktumKey={harUtgifterBarn.faktum} value="false" />
				</SporsmalFaktum>
			</StegFaktum>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data
	};
})(injectIntl(UtgifterGjeld));
