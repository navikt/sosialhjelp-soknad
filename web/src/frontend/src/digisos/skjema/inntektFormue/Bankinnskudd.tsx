import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import CheckboxFaktum, {
	createCheckboxFaktumKey
} from "../../../nav-soknad/faktum/CheckboxFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import {
	radioCheckKeys,
	faktumIsSelected,
	getFaktumVerdi, finnFaktum
} from "../../../nav-soknad/utils";
import { getMaksLengdeFunc } from "../../../nav-soknad/validering/valideringer";
import NivaTreSkjema from "../../../nav-soknad/components/nivaTreSkjema";
import { DispatchProps, SoknadAppState } from "../../../nav-soknad/redux/reduxTypes";
import { connect } from "react-redux";
import { Faktum } from "../../../nav-soknad/types";
import { lagreFaktum } from "../../../nav-soknad/redux/fakta/faktaActions";

type Props = FaktumComponentProps & DispatchProps;

class Bankinnskudd extends React.Component<Props, {}> {

	innskuddstyper = ["brukskonto", "sparekonto", "bsu", "livsforsikring", "aksjer", "annet"];

	harBankinnskudd(): boolean {
		const faktumKey = "inntekt.bankinnskudd.true.type.";
		let faktum: Faktum;
		let harBankinnskudd = false;
		this.innskuddstyper.map((innskuddstype: string) => {
			faktum = finnFaktum(faktumKey + innskuddstype, this.props.fakta);
			const value = faktum ? faktum.value : "";
			if (value === "true") {
				harBankinnskudd = true;
			}
		});
		return harBankinnskudd;
	}

	componentDidUpdate() {
		const harBankinnskuddFaktum = finnFaktum("inntekt.bankinnskudd", this.props.fakta);
		const lagretVerdi = harBankinnskuddFaktum.value;
		const utledetVerdi = this.harBankinnskudd().toString();
		if (lagretVerdi !== utledetVerdi) {
			harBankinnskuddFaktum.value = utledetVerdi;
			this.props.dispatch(lagreFaktum(harBankinnskuddFaktum));
		}
	}

	render() {
		const { fakta } = this.props;
		const hvilkeInnskudd = radioCheckKeys("inntekt.bankinnskudd.true.type");
		const hvilkeInnskuddAnnet = "inntekt.bankinnskudd.true.type.annet";
		return (
			<SporsmalFaktum faktumKey={hvilkeInnskudd.faktum}>
				{this.innskuddstyper.map((innskuddstype: string) => {
					const id = "bankinnskudd_" + innskuddstype + "_checkbox";
					return (
						<CheckboxFaktum
							key={id}
							id={id}
							faktumKey={createCheckboxFaktumKey(
								hvilkeInnskudd.faktum, innskuddstype
							)}
						/>)
				})}
				<NivaTreSkjema
					visible={faktumIsSelected(getFaktumVerdi(fakta, hvilkeInnskuddAnnet))}
					size="small"
				>
					<TextareaFaktum
						id="bankinnskudd_annet_textarea"
						faktumKey={`${hvilkeInnskuddAnnet}.true.beskrivelse`}
						maxLength={400}
						validerFunc={[getMaksLengdeFunc(400)]}
					/>
				</NivaTreSkjema>
			</SporsmalFaktum>
		);
	}
}

export default connect<{}, {}, Props>((state: SoknadAppState) => {
	return {
		fakta: state.fakta.data
	};
})(Bankinnskudd);
