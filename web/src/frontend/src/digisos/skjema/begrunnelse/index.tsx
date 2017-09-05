import * as React from "react";
import { connect } from "react-redux";
import {
	FaktumStoreState,
	FaktumComponentProps
} from "../../../nav-soknad/redux/reducer";
import { DispatchProps } from "../../redux/types";

import Steg from "../../../nav-soknad/components/steg";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";

class Begrunnelse extends React.Component<
	FaktumComponentProps & DispatchProps,
	{}
> {
	render() {
		return (
			<Steg tittelId="begrunnelsebolk.tittel">
				<SporsmalFaktum faktumId="begrunnelse.hvorfor.sporsmal">
					<TextareaFaktum
						textareaClass="skjema-textarea--large"
						faktumKey="begrunnelse.hvorfor"
						labelId="begrunnelse.hvorfor.label"
						maxLength={800}
					/>
				</SporsmalFaktum>
				<SporsmalFaktum faktumId="begrunnelse.hva.sporsmal">
					<TextareaFaktum
						textareaClass="skjema-textarea--large"
						faktumKey="begrunnelse.hva"
						labelId="begrunnelse.hva.label"
						maxLength={800}
					/>
				</SporsmalFaktum>
			</Steg>
		);
	}
}

export default connect((state: FaktumStoreState, props: any) => {
	return {
		fakta: state.faktumStore.fakta
	};
})(Begrunnelse);
