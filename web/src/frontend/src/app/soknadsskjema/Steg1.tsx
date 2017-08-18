import * as React from "react";
import Bolk from "../components/bolk";
import Steg from "../components/steg";
import { Textarea } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../faktum/reducer";
import { setFaktumVerdi } from "../faktum/actions";
import { DispatchProps } from "../utils/types";
import { injectIntl, InjectedIntlProps } from "react-intl";

import FaktumCheckbox from "../faktum/components/FaktumCheckbox";
import FaktumRadio from "../faktum/components/FaktumRadio";
import FaktumSkjemagruppe from "../faktum/components/FaktumSkjemagruppe";
import Underskjema from "../components/underskjema";
import { faktumIsSelected } from "../faktum/utils";
import FaktumInput from "../faktum/components/FaktumInput";

interface StateProps {
	faktum: FaktumMap;
}

class Steg1 extends React.Component<
	StateProps & DispatchProps & InjectedIntlProps,
	any
> {
	render() {
		const { faktum, dispatch, intl } = this.props;
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
						<Underskjema visible={faktumIsSelected(faktum.get("arbeid.dinsituasjon.student"))}>
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
								<FaktumInput
									faktumKey="arbeid.dinsituasjon.student.beskrivelse"
									value="false"
								/>
							</FaktumSkjemagruppe>
						</Underskjema>
						<FaktumCheckbox faktumKey="arbeid.dinsituasjon.annensituasjon" />
						<FaktumSkjemagruppe
							visible={
								faktum.get("arbeid.dinsituasjon.annensituasjon") === "true"
							}
						>
							<Textarea
								label={intl.formatMessage({
									id: "arbeid.dinsituasjon.annensituasjon.true.sporsmal"
								})}
								value={
									faktum.get(
										"arbeid.dinsituasjon.annensituasjon.true.beskrivelse"
									) || ""
								}
								name="arbeid.dinsituasjon.annensituasjon.true.beskrivelse"
								onChange={(evt: any) =>
									dispatch(
										setFaktumVerdi(
											"arbeid.dinsituasjon.annensituasjon.true.beskrivelse",
											evt.target.value
										)
									)}
							/>{" "}
						</FaktumSkjemagruppe>
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
