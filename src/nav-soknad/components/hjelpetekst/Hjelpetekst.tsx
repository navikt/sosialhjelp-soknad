import * as React from "react";
import NavHjelpetekst, {HjelpetekstProps} from "nav-frontend-hjelpetekst";
import {PopoverOrientering} from "nav-frontend-popover";

/** Denne wrapper nav-frontend-moduler
 * sin HjelpetekstAuto frem til de fikser en aria-sjekk
 * for described by
 */
const Hjelpetekst: React.StatelessComponent<HjelpetekstProps> = (
    props: HjelpetekstProps
) => (
    <span>
        <span className="kunSkjermleser" id={`tooltip-${props.id}`}>
            {props.children}
        </span>
        <NavHjelpetekst type={PopoverOrientering.Over} {...props} />
    </span>
);

export default Hjelpetekst;
