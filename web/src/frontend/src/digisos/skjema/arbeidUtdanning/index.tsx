import * as React from "react";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import Jobb from "./Jobb";
import Studie from "./Studie";
import Arbeidsforhold from "./Arbeidsforhold";

const ArbeidOgUtdanning: React.StatelessComponent = () => (
	<DigisosSkjemaSteg steg={DigisosSteg.arbeidbolk}>
		<Arbeidsforhold />
		<Jobb />
		<Studie />
	</DigisosSkjemaSteg>
);

export default ArbeidOgUtdanning;
