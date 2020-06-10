import * as React from "react";
import Hjelpetekst, {HjelpetekstProps} from "nav-frontend-hjelpetekst";

/** Denne wrapper nav-frontend-moduler
 * sin HjelpetekstAuto frem til de fikser en aria-sjekk
 * for described by
 */
const _Hjelpetekst: React.StatelessComponent<HjelpetekstProps> = (props: HjelpetekstProps) => (
    <span>
        <span className="kunSkjermleser" id={`tooltip-${props.id}`}>
            {props.children}
        </span>
        <Hjelpetekst {...props} />
    </span>
);

export default _Hjelpetekst;
