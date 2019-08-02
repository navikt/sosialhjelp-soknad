import * as React from "react";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import BoligIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/BoligIllustrasjon";
import BosituasjonView from "./Bosituasjon";

class Bosituasjon extends React.Component<{}, any> {
	render() {
		return (
			<DigisosSkjemaSteg steg={DigisosSteg.bosituasjonbolk} ikon={<BoligIllustrasjon/>}>
				<BosituasjonView />
			</DigisosSkjemaSteg>
		);
	}
}

export default Bosituasjon;
