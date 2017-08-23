import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import Steg from "../../../skjema/components/steg";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../../../skjema/reducer";
import { faktumIsSelected, radioCheckKeys } from "../../../skjema/utils";

import FaktumCheckbox from "../../../skjema/faktum/FaktumCheckbox";
import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumTextarea from "../../../skjema/faktum/FaktumTextarea";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

interface StateProps {
	faktum: FaktumMap;
}

class InntektFormue extends React.Component<StateProps, any> {
	render() {
		const { faktum } = this.props;
		const mottarYtelser = radioCheckKeys("inntekt.mottarytelser");
		return (
			<Steg tittelId="Inntekt og formue">
				<Sporsmal sporsmalId={mottarYtelser.sporsmal}>
					<FaktumRadio faktumKey={mottarYtelser.faktum} value="false" />
					<FaktumRadio faktumKey={mottarYtelser.faktum} value="true" />
				</Sporsmal>
				<Sporsmal sporsmalId="Har du søkt om ytelser i NAV osm ikke er ferdigbehandlet?">
					<FaktumRadio
						faktumKey="inntekt.ytelserNavUnderBehandling"
						value="false"
					/>
					<FaktumRadio
						faktumKey="inntekt.ytelserNavUnderBehandling"
						value="true"
					/>
				</Sporsmal>
				<Sporsmal sporsmalId="Mottar du bostøtte?">
					<FaktumRadio faktumKey="inntekt.bostotte" value="false" />
					<Underskjema visible={faktum.get("inntekt.bostotte") === "false"}>
						<FaktumSkjemagruppe tittelId="Hvilken støtte mottar du?">
							<FaktumCheckbox
								faktumKey="inntekt.bostotte.false"
								part="husbanken"
							/>
							<FaktumCheckbox
								faktumKey="inntekt.bostotte.false"
								part="kommunalt"
							/>
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey="inntekt.bostotte" value="true" />
				</Sporsmal>
				<Sporsmal sporsmalId="Hva eier du?">
					<FaktumRadio faktumKey="inntekt.eierVerdi" value="false" />
					<Underskjema visible={faktum.get("inntekt.eierVerdi") === "false"}>
						<FaktumSkjemagruppe tittelId="Hvilken støtte mottar du?">
							<FaktumCheckbox
								faktumKey="inntekt.eierVerdi.false"
								part="bolig"
							/>
							<FaktumCheckbox
								faktumKey="inntekt.eierVerdi.false"
								part="campingvogn"
							/>
							<FaktumCheckbox
								faktumKey="inntekt.eierVerdi.false"
								part="kjoretoy"
							/>
							<FaktumCheckbox
								faktumKey="inntekt.eierVerdi.false"
								part="fritidseiendom"
							/>
							<FaktumCheckbox
								faktumKey="inntekt.eierVerdi.false"
								part="annet"
							/>
							{faktumIsSelected(faktum.get("inntekt.eierVerdi.false.annet"))
								? <FaktumTextarea faktumKey="inntekt.eierVerdi.false.annet.true.beskrivelse" />
								: null}
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey="inntekt.eierVerdi" value="true" />
				</Sporsmal>
				<Sporsmal sporsmalId="Har du bankinnskudd eller annen sparing?">
					<FaktumRadio faktumKey="inntekt.innskudd" value="false" />
					<Underskjema visible={faktum.get("inntekt.innskudd") === "false"}>
						<FaktumSkjemagruppe tittelId="Spesifiser">
							<FaktumCheckbox
								faktumKey="inntekt.innskudd.false"
								part="brukskonto"
							/>
							<FaktumCheckbox
								faktumKey="inntekt.innskudd.false"
								part="sparekonto"
							/>
							<FaktumCheckbox
								faktumKey="inntekt.innskudd.false"
								part="livsforsikring"
							/>
							<FaktumCheckbox
								faktumKey="inntekt.innskudd.false"
								part="aksjer"
							/>
							<FaktumCheckbox faktumKey="inntekt.innskudd.false" part="annet" />
							{faktumIsSelected(faktum.get("inntekt.innskudd.false.annet"))
								? <FaktumTextarea faktumKey="inntekt.innskudd.false.annet.true.beskrivelse" />
								: null}
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey="inntekt.innskudd" value="true" />
				</Sporsmal>
				<Sporsmal sporsmalId="Har du de siste tre måneder mottatt noen form for utbetaling?">
					<FaktumRadio faktumKey="inntekt.mottattUtbetaling" value="false" />
					<Underskjema
						visible={faktum.get("inntekt.mottattUtbetaling") === "false"}
					>
						<FaktumSkjemagruppe tittelId="Spesifiser">
							<FaktumCheckbox
								faktumKey="inntekt.mottattUtbetaling.false"
								part="utbytte"
							/>
							<FaktumCheckbox
								faktumKey="inntekt.mottattUtbetaling.false"
								part="salg"
							/>
							<FaktumCheckbox
								faktumKey="inntekt.mottattUtbetaling.false"
								part="forsikringsutbetalinger"
							/>
							<FaktumCheckbox
								faktumKey="inntekt.mottattUtbetaling.false"
								part="annet"
							/>
							{faktumIsSelected(
								faktum.get("inntekt.mottattUtbetaling.false.annet")
							)
								? <FaktumTextarea faktumKey="inntekt.mottattUtbetaling.false.annet.true.beskrivelse" />
								: null}
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey="inntekt.mottattUtbetaling" value="true" />
				</Sporsmal>
			</Steg>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(InntektFormue);
