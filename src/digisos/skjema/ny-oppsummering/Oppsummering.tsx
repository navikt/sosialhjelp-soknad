import * as React from "react";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";

export const Oppsummering = () => {
    return (
        <DigisosSkjemaSteg steg={DigisosSteg.oppsummering}>
            <h1>Heihei</h1>
        </DigisosSkjemaSteg>
    );
};

export default Oppsummering;
