import * as React from "react";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import KredittkortIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/KredittkortIllustrasjon";
import Boutgifter from "./boutgifter/Boutgifter";
import Barneutgifter from "./barneutgifter/Barneutgifter";

class UtgifterGjeld extends React.Component<
	FaktumComponentProps & DispatchProps,
	any
> {
	render() {
		return (
			<DigisosSkjemaSteg steg={DigisosSteg.utgifterbolk} ikon={<KredittkortIllustrasjon/>}>
				<Boutgifter />
				<Barneutgifter />
			</DigisosSkjemaSteg>
		);
	}
}

export default UtgifterGjeld;
