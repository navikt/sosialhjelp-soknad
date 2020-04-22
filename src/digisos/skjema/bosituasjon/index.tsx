import * as React from "react";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import BoligIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/BoligIllustrasjon";
import BosituasjonView from "./Bosituasjon";

const Bosituasjon = () => (
    <DigisosSkjemaSteg steg={DigisosSteg.bosituasjonbolk} ikon={<BoligIllustrasjon />}>
        <BosituasjonView />
    </DigisosSkjemaSteg>
);

export default Bosituasjon;
