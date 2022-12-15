import * as React from "react";
import {digisosSkjemaConfig} from "../../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import SnakkebobleIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/SnakkebobleIllustrasjon";
import BegrunnelseSkjema from "./Begrunnelse";
import StegMedNavigasjon from "../../../nav-soknad/components/SkjemaSteg/SkjemaSteg";

const Begrunnelse: React.FunctionComponent<{}> = () => (
    <StegMedNavigasjon skjemaConfig={digisosSkjemaConfig} steg={"begrunnelsebolk"} ikon={<SnakkebobleIllustrasjon />}>
        <BegrunnelseSkjema />
    </StegMedNavigasjon>
);

export default Begrunnelse;
