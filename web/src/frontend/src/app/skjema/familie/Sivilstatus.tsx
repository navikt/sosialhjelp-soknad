import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../../../skjema/reducer";
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
			<Sporsmal
				sporsmal={intl.formatMessage({
					id: "familie.sivilstatus.sporsmal"
				})}
			>
				<FaktumRadio faktumKey="familie.sivilstatus" value="gift" />
				<Underskjema visible={faktum.get("familie.sivilstatus") === "gift"}>
					<FaktumSkjemagruppe
						title={intl.formatMessage({
							id: "arbeid.dinsituasjon.student.true.heltid.sporsmal"
						})}
					>
						<div className="skjemaelement">what</div>
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey="familie.sivilstatus" value="ugift" />
				<FaktumRadio faktumKey="familie.sivilstatus" value="samboer" />
				<FaktumRadio faktumKey="familie.sivilstatus" value="enke" />
				<FaktumRadio faktumKey="familie.sivilstatus" value="skilt" />
			</Sporsmal>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(injectIntl(Steg1));
