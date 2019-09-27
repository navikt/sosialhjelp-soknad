import * as React from "react";
import { injectIntl } from "react-intl";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import KredittkortIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/KredittkortIllustrasjon";
import Boutgifter from "./boutgifter/Boutgifter";
import Barneutgifter from "./barneutgifter/Barneutgifter";

const UtgifterGjeld: React.FC = () => {
	return (
		<DigisosSkjemaSteg steg={DigisosSteg.utgifterbolk} ikon={<KredittkortIllustrasjon/>}>
			<Boutgifter />
			<Barneutgifter />
		</DigisosSkjemaSteg>
	);
};

export default injectIntl(UtgifterGjeld);
