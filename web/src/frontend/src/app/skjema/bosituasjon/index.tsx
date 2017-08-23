import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import Steg from "../../../skjema/components/steg";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../../../skjema/reducer";
import { DispatchProps } from "../../../redux/types";
import { injectIntl, InjectedIntlProps } from "react-intl";

import FaktumCheckbox from "../../../skjema/faktum/FaktumCheckbox";
import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

interface StateProps {
	faktum: FaktumMap;
}

class Bosituasjon extends React.Component<
	StateProps & DispatchProps & InjectedIntlProps,
	any
> {
	render() {
		const { faktum, intl } = this.props;
		return (
			<Steg tittel="Bosituasjon">
				<Sporsmal
					sporsmal={intl.formatMessage({
						id: "bosituasjonbolk.tittel"
					})}
				>
					<FaktumRadio faktumKey="bosituasjon" value="eier" />
					<FaktumRadio faktumKey="bosituasjon" value="leierprivat" />
					<FaktumRadio faktumKey="bosituasjon" value="leierkommunalt" />
					<FaktumRadio faktumKey="bosituasjon" value="ingen" />
					<FaktumRadio faktumKey="bosituasjon" value="annet" />
					<Underskjema visible={faktum.get("bosituasjon") === "annet"}>
						<FaktumSkjemagruppe
							visible={faktum.get("bosituasjon") === "annet"}
							title={intl.formatMessage({
								id: "bosituasjon.annet"
							})}
						>
							<FaktumCheckbox faktumKey="bosituasjon.annet.true.institusjon" />
							<FaktumCheckbox faktumKey="bosituasjon.annet.true.krisesenter" />
							<FaktumCheckbox faktumKey="bosituasjon.annet.true.fengsel" />
							<FaktumCheckbox faktumKey="bosituasjon.annet.true.venner" />
							<FaktumCheckbox faktumKey="bosituasjon.annet.true.foreldre" />
							<FaktumCheckbox faktumKey="bosituasjon.annet.true.familie" />
						</FaktumSkjemagruppe>
					</Underskjema>
				</Sporsmal>
			</Steg>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(injectIntl(Bosituasjon));
