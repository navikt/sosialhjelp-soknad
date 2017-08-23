import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import Steg from "../../../skjema/components/steg";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../../../skjema/reducer";
import { faktumIsSelected } from "../../../skjema/utils";
import { DispatchProps } from "../../../redux/types";
import { injectIntl, InjectedIntlProps } from "react-intl";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

interface StateProps {
	faktum: FaktumMap;
}

class Steg1 extends React.Component<
	StateProps & DispatchProps & InjectedIntlProps,
	any
> {
	render() {
		const { faktum } = this.props;
		return (
			<Steg tittel="Arbeid og utdanning">
				<Sporsmal sporsmal="Er du i jobb?">
					<FaktumRadio faktumKey="arbeid.dinsituasjon.jobb" value="true" />
					<Underskjema
						visible={faktumIsSelected(faktum.get("arbeid.dinsituasjon.jobb"))}
					>
						<FaktumSkjemagruppe title="Jobber du heltid eller deltid?">
							<FaktumRadio
								faktumKey="arbeid.dinsituasjon.jobb.true"
								value="heltid"
							/>
							<FaktumRadio
								faktumKey="arbeid.dinsituasjon.jobb.true"
								value="deltid"
							/>
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey="arbeid.dinsituasjon.jobb" value="false" />
				</Sporsmal>
				<Sporsmal sporsmal="Studerer du?">
					<FaktumRadio faktumKey="arbeid.dinsituasjon.studerer" value="true" />
					<Underskjema
						visible={faktumIsSelected(
							faktum.get("arbeid.dinsituasjon.studerer")
						)}
					>
						<FaktumSkjemagruppe title="Studerer du heltid eller deltid?">
							<FaktumRadio
								faktumKey="arbeid.dinsituasjon.studerer.true"
								value="heltid"
							/>
							<FaktumRadio
								faktumKey="arbeid.dinsituasjon.studerer.true"
								value="deltid"
							/>
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey="arbeid.dinsituasjon.studerer" value="false" />
				</Sporsmal>
			</Steg>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(injectIntl(Steg1));
