import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import Steg from "../../../skjema/components/steg";
import {connect} from "react-redux";
import {FaktumMap, FaktumState} from "../../../skjema/reducer";
import {DispatchProps} from "../../../redux/types";
import {InjectedIntlProps, injectIntl} from "react-intl";
import {faktumIsSelected, radioCheckKeys} from "../../../skjema/utils";

import FaktumCheckbox from "../../../skjema/faktum/FaktumCheckbox";
import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumTextarea from "../../../skjema/faktum/FaktumTextarea";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

interface StateProps {
	faktum: FaktumMap;
}

class UtgifterGjeld extends React.Component<
	StateProps & DispatchProps & InjectedIntlProps,
	any
> {
	render() {
		const { faktum } = this.props;

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
					<Underskjema visible={faktum.get(harBoutgifter.faktum) === "true"}>
						<FaktumSkjemagruppe tittelId={boUtgifter.sporsmal}>
							<FaktumCheckbox faktumKey={boUtgifter.faktum} option="husleie" />
							<FaktumCheckbox faktumKey={boUtgifter.faktum} option="strom" />
							<FaktumCheckbox faktumKey={boUtgifter.faktum} option="kommunaleavgifter" />
							<FaktumCheckbox faktumKey={boUtgifter.faktum} option="oppvarming" />
							<FaktumCheckbox faktumKey={boUtgifter.faktum} option="avdraglaan" />
							<FaktumCheckbox faktumKey={boUtgifter.faktum} option="andreutgifter" />

							{faktumIsSelected(faktum.get(`${boUtgifter.faktum}.andreutgifter`))
								? <FaktumTextarea faktumKey={andreBoUtgifter} />
								: null}
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey={harBoutgifter.faktum} option="false" />
				</Sporsmal>
				<Sporsmal sporsmalId={harUtgifterBarn.sporsmal}>
					<FaktumRadio faktumKey={harUtgifterBarn.faktum} option="true" />
					<Underskjema visible={faktum.get(harUtgifterBarn.faktum) === "true"}>
						<FaktumSkjemagruppe tittelId={barneUtgifter.sporsmal}>
							<FaktumCheckbox faktumKey={barneUtgifter.faktum} option="fritidsaktivitet"/>
							<FaktumCheckbox faktumKey={barneUtgifter.faktum} option="barnehage"/>
							<FaktumCheckbox faktumKey={barneUtgifter.faktum} option="tannbehandling"/>
							<FaktumCheckbox faktumKey={barneUtgifter.faktum} option="helse"/>
							<FaktumCheckbox faktumKey={barneUtgifter.faktum} option="annet"/>
							{faktumIsSelected(faktum.get(`${barneUtgifter.faktum}.annet`))
								? <FaktumTextarea faktumKey={andreBarneutgifter} />
								: null}
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey={harUtgifterBarn.faktum} option="false" />
				</Sporsmal>
			</Steg>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(injectIntl(UtgifterGjeld));
