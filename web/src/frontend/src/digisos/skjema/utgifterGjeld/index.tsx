import * as React from "react";
import { connect } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";

import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";

import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import { State } from "../../redux/reducers";
import KredittkortIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/KredittkortIllustrasjon";

import Boutgifter from "./boutgifter/Boutgifter";

class UtgifterGjeld extends React.Component<
	FaktumComponentProps & DispatchProps & InjectedIntlProps,
	any
> {
	render() {
		return (
			<DigisosSkjemaSteg steg={DigisosSteg.utgifterbolk} ikon={<KredittkortIllustrasjon/>}>
				<Boutgifter />
			</DigisosSkjemaSteg>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data
	};
})(injectIntl(UtgifterGjeld));
