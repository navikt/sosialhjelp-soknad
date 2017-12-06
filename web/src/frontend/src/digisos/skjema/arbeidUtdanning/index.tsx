import * as React from "react";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import Jobb from "./Jobb";
import Studie from "./Studie";

const ArbeidOgUtdanning: React.StatelessComponent = () => (
	<DigisosSkjemaSteg steg={DigisosSteg.arbeidbolk}>
		<Jobb />
		<Studie />
	</DigisosSkjemaSteg>
);

export default ArbeidOgUtdanning;
