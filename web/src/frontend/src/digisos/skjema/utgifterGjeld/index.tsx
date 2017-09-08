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

import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import StegFaktum from "../../../nav-soknad/faktum/StegFaktum";
import CheckboxFaktum from "../../../nav-soknad/faktum/CheckboxFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";

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
				<SporsmalFaktum faktumKey={harBoutgifter.faktum}>
					<RadioFaktum faktumKey={harBoutgifter.faktum} option="true" />
					<Underskjema
						visible={getFaktumVerdi(fakta, harBoutgifter.faktum) === "true"}>
						<SporsmalFaktum faktumKey={boUtgifter.faktum}>
							{/*TODO checkboxgruppefaktum*/}
							<CheckboxFaktum faktumKey={boUtgifter.faktum} option="husleie" />
							<CheckboxFaktum faktumKey={boUtgifter.faktum} option="strom" />
							<CheckboxFaktum
								faktumKey={boUtgifter.faktum}
								option="kommunaleavgifter"
							/>
							<CheckboxFaktum
								faktumKey={boUtgifter.faktum}
								option="oppvarming"
							/>
							<CheckboxFaktum
								faktumKey={boUtgifter.faktum}
								option="avdraglaan"
							/>
							<CheckboxFaktum
								faktumKey={boUtgifter.faktum}
								option="andreutgifter"
							/>

							{faktumIsSelected(
								getFaktumVerdi(fakta, `${boUtgifter.faktum}.andreutgifter`)
							) ? (
								<TextareaFaktum faktumKey={andreBoUtgifter} />
							) : null}
						</SporsmalFaktum>
					</Underskjema>
					<RadioFaktum faktumKey={harBoutgifter.faktum} option="false" />
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey={harUtgifterBarn.faktum}>
					<RadioFaktum faktumKey={harUtgifterBarn.faktum} option="true" />
					<Underskjema
						visible={getFaktumVerdi(fakta, harUtgifterBarn.faktum) === "true"}>
						{/*TODO checkboxgruppefaktum*/}

						<SporsmalFaktum faktumKey={barneUtgifter.faktum}>
							<CheckboxFaktum
								faktumKey={barneUtgifter.faktum}
								option="fritidsaktivitet"
							/>
							<CheckboxFaktum
								faktumKey={barneUtgifter.faktum}
								option="barnehage"
							/>
							<CheckboxFaktum
								faktumKey={barneUtgifter.faktum}
								option="tannbehandling"
							/>
							<CheckboxFaktum faktumKey={barneUtgifter.faktum} option="helse" />
							<CheckboxFaktum faktumKey={barneUtgifter.faktum} option="annet" />
							{faktumIsSelected(
								getFaktumVerdi(fakta, `${barneUtgifter.faktum}.annet`)
							) ? (
								<TextareaFaktum faktumKey={andreBarneutgifter} />
							) : null}
						</SporsmalFaktum>
					</Underskjema>
					<RadioFaktum faktumKey={harUtgifterBarn.faktum} option="false" />
				</SporsmalFaktum>
			</StegFaktum>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.faktum.fakta
	};
})(injectIntl(UtgifterGjeld));
