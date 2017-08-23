import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import Steg from "../../../skjema/components/steg";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../../../skjema/reducer";
import { faktumIsSelected } from "../../../skjema/utils";
import { DispatchProps } from "../../../redux/types";
import { injectIntl, InjectedIntlProps } from "react-intl";

import FaktumCheckbox from "../../../skjema/faktum/FaktumCheckbox";
import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumTextarea from "../../../skjema/faktum/FaktumTextarea";
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
			<Steg tittel="Arbeid og utdanning">
				<Sporsmal>
					<FaktumSkjemagruppe
						title={intl.formatMessage({
							id: "arbeid.dinsituasjon.sporsmal"
						})}
					>
						<FaktumCheckbox faktumKey="arbeid.dinsituasjon.arbeidsledig" />
						<FaktumCheckbox faktumKey="arbeid.dinsituasjon.jobb" />
						<FaktumCheckbox faktumKey="arbeid.dinsituasjon.student" />
						<Underskjema
							visible={faktumIsSelected(
								faktum.get("arbeid.dinsituasjon.student")
							)}
						>
							<FaktumSkjemagruppe
								visible={faktum.get("arbeid.dinsituasjon.student") === "true"}
								title={intl.formatMessage({
									id: "arbeid.dinsituasjon.student.true.heltid.sporsmal"
								})}
							>
								<FaktumRadio
									faktumKey="arbeid.dinsituasjon.student.true.heltid"
									value="true"
								/>
								<FaktumRadio
									faktumKey="arbeid.dinsituasjon.student.true.heltid"
									value="false"
								/>
							</FaktumSkjemagruppe>
						</Underskjema>
						<FaktumCheckbox faktumKey="arbeid.dinsituasjon.annensituasjon" />
						<Underskjema
							visible={faktumIsSelected(
								faktum.get("arbeid.dinsituasjon.annensituasjon")
							)}
						>
							<FaktumTextarea faktumKey="arbeid.dinsituasjon.annensituasjon.true.beskrivelse" />
						</Underskjema>
					</FaktumSkjemagruppe>
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
