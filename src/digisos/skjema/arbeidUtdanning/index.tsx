import * as React from "react";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import Koffert from "../../../nav-soknad/components/svg/illustrasjoner/Koffert";
import Utdanning from "./utdanning/Utdanning";
import Arbeid from "./arbeid/Arbeid";

const ArbeidOgUtdanning = () => (
    <DigisosSkjemaSteg steg={DigisosSteg.arbeidbolk} ikon={<Koffert />}>
        <Arbeid />
        <Utdanning />
    </DigisosSkjemaSteg>
);

export default ArbeidOgUtdanning;
