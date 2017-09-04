import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import Steg from "../../../nav-skjema/components/steg";
import { connect } from "react-redux";
import {
	FaktumComponentProps,
	FaktumStoreState
} from "../../../nav-skjema/redux/reducer";
import { DispatchProps } from "../../../redux/types";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { faktumIsSelected, radioCheckKeys } from "../../../nav-skjema/utils";

import FaktumCheckbox from "../../../nav-skjema/faktum/FaktumCheckbox";
import FaktumRadio from "../../../nav-skjema/faktum/FaktumRadio";
import FaktumTextarea from "../../../nav-skjema/faktum/FaktumTextarea";
import FaktumSkjemagruppe from "../../../nav-skjema/faktum/FaktumSkjemagruppe";
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
					<FaktumRadio faktumKey={harBoutgifter.faktum} option="true" />
					<Underskjema visible={fakta.get(harBoutgifter.faktum) === "true"}>
						<FaktumSkjemagruppe tittelId={boUtgifter.sporsmal}>
							{/*TODO checkboxgruppefaktum*/}
							<FaktumCheckbox faktumKey={boUtgifter.faktum} option="husleie" />
							<FaktumCheckbox faktumKey={boUtgifter.faktum} option="strom" />
							<FaktumCheckbox
								faktumKey={boUtgifter.faktum}
								option="kommunaleavgifter"
							/>
							<FaktumCheckbox
								faktumKey={boUtgifter.faktum}
								option="oppvarming"
							/>
							<FaktumCheckbox
								faktumKey={boUtgifter.faktum}
								option="avdraglaan"
							/>
							<FaktumCheckbox
								faktumKey={boUtgifter.faktum}
								option="andreutgifter"
							/>

							{faktumIsSelected(
								fakta.get(`${boUtgifter.faktum}.andreutgifter`)
							) ? (
								<FaktumTextarea faktumKey={andreBoUtgifter} />
							) : null}
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey={harBoutgifter.faktum} option="false" />
				</Sporsmal>
				<Sporsmal sporsmalId={harUtgifterBarn.sporsmal}>
					<FaktumRadio faktumKey={harUtgifterBarn.faktum} option="true" />
					<Underskjema visible={fakta.get(harUtgifterBarn.faktum) === "true"}>
						{/*TODO checkboxgruppefaktum*/}

						<FaktumSkjemagruppe tittelId={barneUtgifter.sporsmal}>
							<FaktumCheckbox
								faktumKey={barneUtgifter.faktum}
								option="fritidsaktivitet"
							/>
							<FaktumCheckbox
								faktumKey={barneUtgifter.faktum}
								option="barnehage"
							/>
							<FaktumCheckbox
								faktumKey={barneUtgifter.faktum}
								option="tannbehandling"
							/>
							<FaktumCheckbox faktumKey={barneUtgifter.faktum} option="helse" />
							<FaktumCheckbox faktumKey={barneUtgifter.faktum} option="annet" />
							{faktumIsSelected(fakta.get(`${barneUtgifter.faktum}.annet`)) ? (
								<FaktumTextarea faktumKey={andreBarneutgifter} />
							) : null}
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey={harUtgifterBarn.faktum} option="false" />
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
