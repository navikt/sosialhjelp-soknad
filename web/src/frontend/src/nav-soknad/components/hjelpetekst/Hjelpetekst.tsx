import * as React from "react";
import { HjelpetekstAuto, HjelpetekstProps } from "nav-frontend-hjelpetekst";

/** Denne wrapper nav-frontend-moduler
 * sin HjelpetekstAuto frem til de fikser en aria-sjekk
 * for described by
 */
const Hjelpetekst: React.StatelessComponent<HjelpetekstProps> = (
	props: HjelpetekstProps
) => (
	<span>
		<span className="invisible" id={`tooltip-${props.id}`}>
			{props.children}
		</span>
		<HjelpetekstAuto {...props} />
	</span>
);

export default Hjelpetekst;
