import * as React from "react";
import BoligIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/BoligIllustrasjon";
import {digisosSkjemaConfig} from "../../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import AntallPersoner from "./AntallPersoner";
import Botype from "./Botype";
import StegMedNavigasjon from "../../../nav-soknad/components/SkjemaSteg/SkjemaStegLegacy";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";

export const Bosituasjon = () => {
    const behandlingsId = useBehandlingsId();

    return (
        <StegMedNavigasjon skjemaConfig={digisosSkjemaConfig} steg={"bosituasjonbolk"} ikon={<BoligIllustrasjon />}>
            <div className={"space-y-5"}>
                <Botype behandlingsId={behandlingsId} />
                <AntallPersoner behandlingsId={behandlingsId} />
            </div>
        </StegMedNavigasjon>
    );
};

export default Bosituasjon;
