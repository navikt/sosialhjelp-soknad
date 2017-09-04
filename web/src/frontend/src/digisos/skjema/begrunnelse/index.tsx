import * as React from "react";
import { connect } from "react-redux";
import {
	FaktumStoreState,
	FaktumComponentProps
} from "../../../nav-skjema/redux/reducer";
import { DispatchProps } from "../../redux/types";

import Steg from "../../../nav-skjema/components/steg";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import TextareaFaktum from "../../../nav-skjema/faktum/TextareaFaktum";

class Begrunnelse extends React.Component<
	FaktumComponentProps & DispatchProps,
	{}
> {
	render() {
		return (
			<Steg tittelId="begrunnelsebolk.tittel">
				<Sporsmal sporsmalId="begrunnelse.hvorfor.sporsmal">
					<TextareaFaktum
						textareaClass="skjema-textarea--large"
						faktumKey="begrunnelse.hvorfor"
						labelId="begrunnelse.hvorfor.label"
						maxLength={800}
					/>
				</Sporsmal>
				<Sporsmal sporsmalId="begrunnelse.hva.sporsmal">
					<TextareaFaktum
						textareaClass="skjema-textarea--large"
						faktumKey="begrunnelse.hva"
						labelId="begrunnelse.hva.label"
						maxLength={800}
					/>
				</Sporsmal>
			</Steg>
		);
	}
}

export default connect((state: FaktumStoreState, props: any) => {
	return {
		fakta: state.faktumStore.fakta
	};
})(Begrunnelse);
