import * as React from "react";
import Bolk from "../../../../skjema/components/bolk";
import Steg from "../../../../skjema/components/steg";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../../../../skjema/faktum/reducer";
import { faktumIsSelected } from "../../../../skjema/faktum/utils";
import { DispatchProps } from "../../../../redux/types";
import { injectIntl, InjectedIntlProps } from "react-intl";

import FaktumCheckbox from "../../../../skjema/faktum/components/FaktumCheckbox";
import FaktumRadio from "../../../../skjema/faktum/components/FaktumRadio";
import FaktumTextarea from "../../../../skjema/faktum/components/FaktumTextarea";
import FaktumSkjemagruppe from "../../../../skjema/faktum/components/FaktumSkjemagruppe";
import Underskjema from "../../../../skjema/components/underskjema";

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
				<Bolk hjelpetekst="Hjelpetekst om bosituasjon.">
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
				</Bolk>
			</Steg>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(injectIntl(Steg1));
