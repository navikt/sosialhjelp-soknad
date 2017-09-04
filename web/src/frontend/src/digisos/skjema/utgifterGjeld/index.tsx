import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import Steg from "../../../nav-skjema/components/steg";
import { connect } from "react-redux";
import {
	FaktumComponentProps,
	FaktumStoreState
} from "../../../nav-skjema/redux/reducer";
import { DispatchProps } from "../../redux/types";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { faktumIsSelected, radioCheckKeys } from "../../../nav-skjema/utils";

import CheckboxFaktum from "../../../nav-skjema/faktum/CheckboxFaktum";
import RadioFaktum from "../../../nav-skjema/faktum/RadioFaktum";
import TextareaFaktum from "../../../nav-skjema/faktum/TextareaFaktum";
import SkjemagruppeFaktum from "../../../nav-skjema/faktum/SkjemagruppeFaktum";
import Underskjema from "../../../nav-skjema/components/underskjema";

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
			<Steg tittelId="utgifterbolk.tittel">
				<Sporsmal sporsmalId={harBoutgifter.sporsmal}>
					<RadioFaktum faktumKey={harBoutgifter.faktum} option="true" />
					<Underskjema visible={fakta.get(harBoutgifter.faktum) === "true"}>
						<SkjemagruppeFaktum tittelId={boUtgifter.sporsmal}>
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
								fakta.get(`${boUtgifter.faktum}.andreutgifter`)
							) ? (
								<TextareaFaktum faktumKey={andreBoUtgifter} />
							) : null}
						</SkjemagruppeFaktum>
					</Underskjema>
					<RadioFaktum faktumKey={harBoutgifter.faktum} option="false" />
				</Sporsmal>
				<Sporsmal sporsmalId={harUtgifterBarn.sporsmal}>
					<RadioFaktum faktumKey={harUtgifterBarn.faktum} option="true" />
					<Underskjema visible={fakta.get(harUtgifterBarn.faktum) === "true"}>
						{/*TODO checkboxgruppefaktum*/}

						<SkjemagruppeFaktum tittelId={barneUtgifter.sporsmal}>
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
							{faktumIsSelected(fakta.get(`${barneUtgifter.faktum}.annet`)) ? (
								<TextareaFaktum faktumKey={andreBarneutgifter} />
							) : null}
						</SkjemagruppeFaktum>
					</Underskjema>
					<RadioFaktum faktumKey={harUtgifterBarn.faktum} option="false" />
				</Sporsmal>
			</Steg>
		);
	}
}

export default connect((state: FaktumStoreState, props: any) => {
	return {
		fakta: state.faktumStore.fakta
	};
})(injectIntl(UtgifterGjeld));
