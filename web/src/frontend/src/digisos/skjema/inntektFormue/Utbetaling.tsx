import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../nav-skjema/redux/reducer";
import { radioCheckKeys, faktumIsSelected } from "../../../nav-skjema/utils";

import FaktumRadio from "../../../nav-skjema/faktum/FaktumRadio";
import FaktumCheckbox from "../../../nav-skjema/faktum/FaktumCheckbox";
import FaktumTextarea from "../../../nav-skjema/faktum/FaktumTextarea";
import FaktumSkjemagruppe from "../../../nav-skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../nav-skjema/components/underskjema";

class Bankinnskudd extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const utbetaling = radioCheckKeys("inntekt.inntekter");
		const hvilkeUtbetalinger = radioCheckKeys("inntekt.inntekter.true.type");
		const hvilkeUtbetalingerAnnet = "inntekt.inntekter.true.type.annet";
		return (
			<Sporsmal sporsmalId={utbetaling.sporsmal}>
				<FaktumRadio faktumKey={utbetaling.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(fakta.get(utbetaling.faktum))}>
					<FaktumSkjemagruppe tittelId={hvilkeUtbetalinger.sporsmal}>
						{/*TODO legg til checkboxgruppefaktum*/}
						<FaktumCheckbox
							faktumKey={hvilkeUtbetalinger.faktum}
							option="utbytte"
						/>
						<FaktumCheckbox
							faktumKey={hvilkeUtbetalinger.faktum}
							option="salg"
						/>
						<FaktumCheckbox
							faktumKey={hvilkeUtbetalinger.faktum}
							option="forsikringsutbetalinger"
						/>
						<FaktumCheckbox
							faktumKey={hvilkeUtbetalinger.faktum}
							option="annet"
						/>
						{faktumIsSelected(fakta.get(hvilkeUtbetalingerAnnet)) ? (
							<FaktumTextarea
								faktumKey={`${hvilkeUtbetalingerAnnet}.true.beskrivelse`}
							/>
						) : null}
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey={utbetaling.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default Bankinnskudd;
