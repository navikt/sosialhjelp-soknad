import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../nav-skjema/redux/reducer";
import { radioCheckKeys, faktumIsSelected } from "../../../nav-skjema/utils";

import RadioFaktum from "../../../nav-skjema/faktum/RadioFaktum";
import CheckboxFaktum from "../../../nav-skjema/faktum/CheckboxFaktum";
import TextareaFaktum from "../../../nav-skjema/faktum/TextareaFaktum";
import SkjemagruppeFaktum from "../../../nav-skjema/faktum/SkjemagruppeFaktum";
import Underskjema from "../../../nav-skjema/components/underskjema";

class Bankinnskudd extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const utbetaling = radioCheckKeys("inntekt.inntekter");
		const hvilkeUtbetalinger = radioCheckKeys("inntekt.inntekter.true.type");
		const hvilkeUtbetalingerAnnet = "inntekt.inntekter.true.type.annet";
		return (
			<Sporsmal sporsmalId={utbetaling.sporsmal}>
				<RadioFaktum faktumKey={utbetaling.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(fakta.get(utbetaling.faktum))}>
					<SkjemagruppeFaktum tittelId={hvilkeUtbetalinger.sporsmal}>
						{/*TODO legg til checkboxgruppefaktum*/}
						<CheckboxFaktum
							faktumKey={hvilkeUtbetalinger.faktum}
							option="utbytte"
						/>
						<CheckboxFaktum
							faktumKey={hvilkeUtbetalinger.faktum}
							option="salg"
						/>
						<CheckboxFaktum
							faktumKey={hvilkeUtbetalinger.faktum}
							option="forsikringsutbetalinger"
						/>
						<CheckboxFaktum
							faktumKey={hvilkeUtbetalinger.faktum}
							option="annet"
						/>
						{faktumIsSelected(fakta.get(hvilkeUtbetalingerAnnet)) ? (
							<TextareaFaktum
								faktumKey={`${hvilkeUtbetalingerAnnet}.true.beskrivelse`}
							/>
						) : null}
					</SkjemagruppeFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={utbetaling.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default Bankinnskudd;
