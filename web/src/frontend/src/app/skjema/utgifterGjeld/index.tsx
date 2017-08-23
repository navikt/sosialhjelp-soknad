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
			<Steg tittel="Utgifter og gjeld">
				<Sporsmal sporsmal="Har du boutgifter?">
					<FaktumRadio faktumKey="utgift.bo" value="false" />
					<Underskjema visible={faktum.get("utgift.bo") === "false"}>
						<FaktumSkjemagruppe title="Hvilken utgifter er det?">
							<FaktumCheckbox faktumKey="utgift.bo.false.husleie" />
							<FaktumCheckbox faktumKey="utgift.bo.false.strom" />
							<FaktumCheckbox faktumKey="utgift.bo.false.kommunale" />
							<FaktumCheckbox faktumKey="utgift.bo.false.oppvarming" />
							<FaktumCheckbox faktumKey="utgift.bo.false.avdrag" />
							<FaktumCheckbox faktumKey="utgift.bo.false.andre" />
							{faktumIsSelected(faktum.get("utgift.bo.false.andre"))
								? <FaktumTextarea faktumKey="utgift.bo.false.andre.true.beskrivelse" />
								: null}
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey="utgift.bo" value="true" />
				</Sporsmal>
				<Sporsmal sporsmal="Har du utgifter til barn?">
					<FaktumRadio faktumKey="utgift.barn" value="false" />
					<Underskjema visible={faktum.get("utgift.barn") === "false"}>
						<FaktumSkjemagruppe title="Hvilken utgifter er det?">
							<FaktumCheckbox faktumKey="utgift.barn.false.fritidsaktivitet" />
							<FaktumCheckbox faktumKey="utgift.barn.false.barnehage" />
							<FaktumCheckbox faktumKey="utgift.barn.false.tannbehandling" />
							<FaktumCheckbox faktumKey="utgift.barn.false.helse" />
							<FaktumCheckbox faktumKey="utgift.barn.false.annet" />
							{faktumIsSelected(faktum.get("utgift.barn.false.annet"))
								? <FaktumTextarea faktumKey="utgift.barn.false.annet.true.beskrivelse" />
								: null}
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey="utgift.barn" value="true" />
				</Sporsmal>
				<Sporsmal sporsmal="Har du ekstrautgifter til helse?">
					<FaktumRadio faktumKey="utgift.helse" value="false" />
					<FaktumRadio faktumKey="utgift.helse" value="true" />
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
