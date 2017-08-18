import * as React from "react";
import Bolk from "../components/bolk";
import Steg from "../components/steg";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../faktum/reducer";
import { faktumIsSelected } from "../faktum/utils";
import { DispatchProps } from "../utils/types";
import { injectIntl, InjectedIntlProps } from "react-intl";

import FaktumCheckbox from "../faktum/components/FaktumCheckbox";
import FaktumRadio from "../faktum/components/FaktumRadio";
import FaktumTextarea from "../faktum/components/FaktumTextarea";
import FaktumSkjemagruppe from "../faktum/components/FaktumSkjemagruppe";

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
						<FaktumSkjemagruppe
							visible={faktumIsSelected(
								faktum.get("arbeid.dinsituasjon.student")
							)}
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
						<FaktumCheckbox faktumKey="arbeid.dinsituasjon.annensituasjon" />
						{faktumIsSelected(faktum.get("arbeid.dinsituasjon.annensituasjon"))
							? <FaktumTextarea faktumKey="arbeid.dinsituasjon.annensituasjon.true.beskrivelse" />
							: null}
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
