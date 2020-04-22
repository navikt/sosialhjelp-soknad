import * as React from "react";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import SnakkebobleIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/SnakkebobleIllustrasjon";
import BegrunnelseSkjema from "./Begrunnelse";

const Begrunnelse: React.FunctionComponent<{}> = () => (
    <DigisosSkjemaSteg steg={DigisosSteg.begrunnelsebolk} ikon={<SnakkebobleIllustrasjon />}>
        <BegrunnelseSkjema />
    </DigisosSkjemaSteg>
);

export default Begrunnelse;
