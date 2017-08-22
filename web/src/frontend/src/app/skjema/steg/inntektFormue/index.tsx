import * as React from "react";
import Bolk from "../../../../skjema/components/bolk";
import Steg from "../../../../skjema/components/steg";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../../../../skjema/reducer";
import { DispatchProps } from "../../../../redux/types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { faktumIsSelected } from "../../../../skjema/utils";

import FaktumCheckbox from "../../../../skjema/faktum/FaktumCheckbox";
import FaktumRadio from "../../../../skjema/faktum/FaktumRadio";
import FaktumTextarea from "../../../../skjema/faktum/FaktumTextarea";
import FaktumSkjemagruppe from "../../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../../skjema/components/underskjema";

interface StateProps {
	faktum: FaktumMap;
}

class InntektFormue extends React.Component<
	StateProps & DispatchProps & InjectedIntlProps,
	any
> {
	render() {
		const { faktum } = this.props;
		return (
			<Steg tittel="Inntekt og formue">
				<Bolk>
					<FaktumSkjemagruppe title="Mottar du ytelser fra NAV">
						<FaktumRadio faktumKey="inntekt.ytelserNav" value="false" />
						<FaktumRadio faktumKey="inntekt.ytelserNav" value="true" />
					</FaktumSkjemagruppe>
				</Bolk>
				<Bolk>
					<FaktumSkjemagruppe title="Har du søkt om ytelser i NAV osm ikke er ferdigbehandlet?">
						<FaktumRadio
							faktumKey="inntekt.ytelserNavUnderBehandling"
							value="false"
						/>
						<FaktumRadio
							faktumKey="inntekt.ytelserNavUnderBehandling"
							value="true"
						/>
					</FaktumSkjemagruppe>
				</Bolk>
				<Bolk>
					<FaktumSkjemagruppe title="Mottar du bostøtte?">
						<FaktumRadio faktumKey="inntekt.bostotte" value="false" />
						<Underskjema visible={faktum.get("inntekt.bostotte") === "false"}>
							<FaktumSkjemagruppe title="Hvilken støtte mottar du?">
								<FaktumCheckbox faktumKey="inntekt.bostotte.false.husbanken" />
								<FaktumCheckbox faktumKey="inntekt.bostotte.false.kommunalt" />
							</FaktumSkjemagruppe>
						</Underskjema>
						<FaktumRadio faktumKey="inntekt.bostotte" value="true" />
					</FaktumSkjemagruppe>
				</Bolk>
				<Bolk>
					<FaktumSkjemagruppe title="Hva eier du?">
						<FaktumRadio faktumKey="inntekt.eierVerdi" value="false" />
						<Underskjema visible={faktum.get("inntekt.eierVerdi") === "false"}>
							<FaktumSkjemagruppe title="Hvilken støtte mottar du?">
								<FaktumCheckbox faktumKey="inntekt.eierVerdi.false.bolig" />
								<FaktumCheckbox faktumKey="inntekt.eierVerdi.false.campingvogn" />
								<FaktumCheckbox faktumKey="inntekt.eierVerdi.false.kjoretoy" />
								<FaktumCheckbox faktumKey="inntekt.eierVerdi.false.fritidseiendom" />
								<FaktumCheckbox faktumKey="inntekt.eierVerdi.false.annet" />
								{faktumIsSelected(faktum.get("inntekt.eierVerdi.false.annet"))
									? <FaktumTextarea faktumKey="inntekt.eierVerdi.false.annet.true.beskrivelse" />
									: null}
							</FaktumSkjemagruppe>
						</Underskjema>
						<FaktumRadio faktumKey="inntekt.eierVerdi" value="true" />
					</FaktumSkjemagruppe>
				</Bolk>
				<Bolk>
					<FaktumSkjemagruppe title="Har du bankinnskudd eller annen sparing?">
						<FaktumRadio faktumKey="inntekt.innskudd" value="false" />
						<Underskjema visible={faktum.get("inntekt.innskudd") === "false"}>
							<FaktumSkjemagruppe title="Spesifiser">
								<FaktumCheckbox faktumKey="inntekt.innskudd.false.brukskonto" />
								<FaktumCheckbox faktumKey="inntekt.innskudd.false.sparekonto" />
								<FaktumCheckbox faktumKey="inntekt.innskudd.false.livsforsikring" />
								<FaktumCheckbox faktumKey="inntekt.innskudd.false.aksjer" />
								<FaktumCheckbox faktumKey="inntekt.innskudd.false.annet" />
								{faktumIsSelected(faktum.get("inntekt.innskudd.false.annet"))
									? <FaktumTextarea faktumKey="inntekt.innskudd.false.annet.true.beskrivelse" />
									: null}
							</FaktumSkjemagruppe>
						</Underskjema>
						<FaktumRadio faktumKey="inntekt.innskudd" value="true" />
					</FaktumSkjemagruppe>
				</Bolk>
				<Bolk>
					<FaktumSkjemagruppe title="Har du de siste tre måneder mottatt noen form for utbetaling?">
						<FaktumRadio faktumKey="inntekt.mottattUtbetaling" value="false" />
						<Underskjema
							visible={faktum.get("inntekt.mottattUtbetaling") === "false"}
						>
							<FaktumSkjemagruppe title="Spesifiser">
								<FaktumCheckbox faktumKey="inntekt.mottattUtbetaling.false.utbytte" />
								<FaktumCheckbox faktumKey="inntekt.mottattUtbetaling.false.salg" />
								<FaktumCheckbox faktumKey="inntekt.mottattUtbetaling.false.forsikringsutbetalinger" />
								<FaktumCheckbox faktumKey="inntekt.mottattUtbetaling.false.annet" />
								{faktumIsSelected(
									faktum.get("inntekt.mottattUtbetaling.false.annet")
								)
									? <FaktumTextarea faktumKey="inntekt.mottattUtbetaling.false.annet.true.beskrivelse" />
									: null}
							</FaktumSkjemagruppe>
						</Underskjema>
						<FaktumRadio faktumKey="inntekt.mottattUtbetaling" value="true" />
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
})(injectIntl(InntektFormue));
