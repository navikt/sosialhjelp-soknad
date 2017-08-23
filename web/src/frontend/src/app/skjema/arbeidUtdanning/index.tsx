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
		const { faktum, intl } = this.props;
		return (
			<Steg tittel={intl.messages["arbeidbolk.tittel"]}>
				<Sporsmal sporsmal={intl.messages["dinsituasjon.jobb.sporsmal"]}>
					<FaktumRadio faktumKey="dinsituasjon.jobb" value="true" />
					<Underskjema
						visible={faktumIsSelected(faktum.get("dinsituasjon.jobb"))}
					>
						<FaktumSkjemagruppe
							title={intl.messages["dinsituasjon.jobb.true.sporsmal"]}
						>
							<FaktumRadio faktumKey="dinsituasjon.jobb.true" value="heltid" />
							<FaktumRadio faktumKey="dinsituasjon.jobb.true" value="deltid" />
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey="dinsituasjon.jobb" value="false" />
				</Sporsmal>
				<Sporsmal sporsmal={intl.messages["dinsituasjon.studerer.sporsmal"]}>
					<FaktumRadio faktumKey="dinsituasjon.studerer" value="true" />
					<Underskjema
						visible={faktumIsSelected(faktum.get("dinsituasjon.studerer"))}
					>
						<FaktumSkjemagruppe
							title={intl.messages["dinsituasjon.studerer.true.sporsmal"]}
						>
							<FaktumRadio
								faktumKey="dinsituasjon.studerer.true"
								value="heltid"
							/>
							<FaktumRadio
								faktumKey="dinsituasjon.studerer.true"
								value="deltid"
							/>
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey="dinsituasjon.studerer" value="false" />
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
