import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import Steg from "../../../skjema/components/steg";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../../../skjema/reducer";
import { DispatchProps } from "../../../redux/types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { faktumIsSelected } from "../../../skjema/utils";

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
		return (
			<Steg tittelId="Utgifter og gjeld">
				<Sporsmal sporsmalId="Har du boutgifter?">
					<FaktumRadio faktumKey="utgift.bo" option="false" />
					<Underskjema visible={faktum.get("utgift.bo") === "false"}>
						<FaktumSkjemagruppe tittelId="Hvilken utgifter er det?">
							<FaktumCheckbox faktumKey="utgift.bo.false" option="husleie" />
							<FaktumCheckbox faktumKey="utgift.bo.false" option="strom" />
							<FaktumCheckbox faktumKey="utgift.bo.false" option="kommunale" />
							<FaktumCheckbox faktumKey="utgift.bo.false" option="oppvarming" />
							<FaktumCheckbox faktumKey="utgift.bo.false" option="avdrag" />
							<FaktumCheckbox faktumKey="utgift.bo.false" option="andre" />
							{faktumIsSelected(faktum.get("utgift.bo.false.andre"))
								? <FaktumTextarea faktumKey="utgift.bo.false.andre.true.beskrivelse" />
								: null}
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey="utgift.bo" option="true" />
				</Sporsmal>
				<Sporsmal sporsmalId="Har du utgifter til barn?">
					<FaktumRadio faktumKey="utgift.barn" option="false" />
					<Underskjema visible={faktum.get("utgift.barn") === "false"}>
						<FaktumSkjemagruppe tittelId="Hvilken utgifter er det?">
							<FaktumCheckbox
								faktumKey="utgift.barn.false"
								option="fritidsaktivitet"
							/>
							<FaktumCheckbox
								faktumKey="utgift.barn.false"
								option="barnehage"
							/>
							<FaktumCheckbox
								faktumKey="utgift.barn.false"
								option="tannbehandling"
							/>
							<FaktumCheckbox faktumKey="utgift.barn.false" option="helse" />
							<FaktumCheckbox faktumKey="utgift.barn.false" option="annet" />
							{faktumIsSelected(faktum.get("utgift.barn.false.annet"))
								? <FaktumTextarea faktumKey="utgift.barn.false.annet.true.beskrivelse" />
								: null}
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey="utgift.barn" option="true" />
				</Sporsmal>
				<Sporsmal sporsmalId="Har du ekstrautgifter til helse?">
					<FaktumRadio faktumKey="utgift.helse" option="false" />
					<FaktumRadio faktumKey="utgift.helse" option="true" />
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
