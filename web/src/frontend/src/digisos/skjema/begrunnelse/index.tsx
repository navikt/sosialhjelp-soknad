import * as React from "react";
import { connect } from "react-redux";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import { State } from "../../redux/reducers";
import { DispatchProps } from "../../redux/types";

import StegFaktum from "../../../nav-soknad/faktum/StegFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";

class Begrunnelse extends React.Component<
	FaktumComponentProps & DispatchProps,
	{}
> {
	render() {
		return (
			<StegFaktum tittelId="begrunnelsebolk.tittel">
				<SporsmalFaktum faktumKey="begrunnelse.hvorfor">
					<TextareaFaktum
						textareaClass="skjema-textarea--large"
						faktumKey="begrunnelse.hvorfor"
						labelId="begrunnelse.hvorfor.label"
						maxLength={800}
					/>
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey="begrunnelse.hva">
					<TextareaFaktum
						textareaClass="skjema-textarea--large"
						faktumKey="begrunnelse.hva"
						labelId="begrunnelse.hva.label"
						maxLength={800}
					/>
				</SporsmalFaktum>
			</StegFaktum>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data
	};
})(Begrunnelse);
